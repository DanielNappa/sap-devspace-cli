const { Buffer } = require("node:buffer");
const http = require("node:http");
const https = require("node:https");
const { URL } = require("node:url");

const NOISY_DATA_PREFIX = "data:application/octet-stream;base64";
const MAX_BODY_PREVIEW = 4096;
function formatUrl(u) {
  const s = String(u);
  return s.length > 200
    ? s.slice(0, 200) + "…(truncated " + (s.length - 200) + " chars)"
    : s;
}

// Redact sensitive headers (request/response)
function redactHeaders(obj) {
  try {
    if (!obj || typeof obj !== "object") return obj;
    const out = Array.isArray(obj) ? [...obj] : { ...obj };
    const lowerKeys = new Set([
      "authorization",
      "proxy-authorization",
      "x-approuter-authorization",
      "x-api-key",
      "api-key",
      "cookie",
      "set-cookie",
    ]);
    // Node http headers are usually lowercased keys
    for (const k of Object.keys(out)) {
      const lk = k.toLowerCase();
      if (lowerKeys.has(lk)) {
        out[k] = "[REDACTED]";
      }
    }
    return out;
  } catch {
    return obj;
  }
}

// Normalize fetch Headers or plain object into a simple object for logging
function normalizeFetchHeaders(h) {
  try {
    if (h && typeof h.entries === "function") {
      return Object.fromEntries(h.entries());
    }
  } catch {}
  return h || {};
}

function makeWrapper(original, proto) {
  return function wrappedRequest(input, options, callback) {
    // Normalize to URL + options
    let urlObj;
    let opts = {};
    if (typeof input === "string") {
      urlObj = new URL(input);
      opts = options || {};
    } else if (input instanceof URL) {
      urlObj = input;
      opts = options || {};
    } else {
      // http.request(options, cb)
      opts = input || {};
      const protocol = opts.protocol ||
        (proto === "https" ? "https:" : "http:");
      const host = opts.hostname || opts.host || "localhost";
      const port = opts.port ? `:${opts.port}` : "";
      const path = opts.path || "/";
      urlObj = new URL(`${protocol}//${host}${port}${path}`);
      callback = options;
    }

    const method = (opts.method || "GET").toUpperCase();
    const headers = Object.assign({}, opts.headers);

    // Call original to get the request object
    const req = original.call(this, urlObj, opts, callback);

    // Capture request body (only for small payloads; guard size in practice)
    const chunks = [];
    let totalSize = 0;
    const MAX_BUFFER_SIZE = 1024 * 1024; // 1MB limit
    const oldWrite = req.write;
    const oldEnd = req.end;

    req.write = function (chunk, encoding, cb) {
      if (chunk) {
        const buffer = Buffer.isBuffer(chunk)
          ? chunk
          : Buffer.from(chunk, encoding);
        if (totalSize + buffer.length <= MAX_BUFFER_SIZE) {
          chunks.push(buffer);
          totalSize += buffer.length;
        }
      }
      return oldWrite.call(this, chunk, encoding, cb);
    };

    req.end = function (chunk, encoding, cb) {
      if (chunk) {
        const buffer = Buffer.isBuffer(chunk)
          ? chunk
          : Buffer.from(chunk, encoding);
        if (totalSize + buffer.length <= MAX_BUFFER_SIZE) {
          chunks.push(buffer);
          totalSize += buffer.length;
        }
      }
      const bodyPreview = chunks.length ? Buffer.concat(chunks) : null;
      // Log the request once we know the final body
      try {
        const displayUrl = formatUrl(urlObj.toString());
        console.error(`[http-spy] ${method} ${displayUrl}`);
        console.error(
          `[http-spy] Request headers: ${
            JSON.stringify(redactHeaders(headers), null, 2)
          }`,
        );

        const contentType =
          (headers && (headers["content-type"] || headers["Content-Type"])) ||
          "";
        const isOctetStream = typeof contentType === "string" &&
          contentType.includes("application/octet-stream");

        if (bodyPreview && bodyPreview.length > 0) {
          if (isOctetStream) {
            console.error(
              `[http-spy] Request body skipped (application/octet-stream, ${bodyPreview.length} bytes)`,
            );
          } else {
            let text = bodyPreview.toString("utf8");
            // Try to pretty-print JSON; fall back to raw text
            try {
              const json = JSON.parse(text);
              text = JSON.stringify(json, null, 2);
            } catch {}
            if (text.length > MAX_BODY_PREVIEW) {
              text = text.slice(0, MAX_BODY_PREVIEW) +
                `…(truncated ${text.length - MAX_BODY_PREVIEW} chars)`;
            }
            console.error(
              `[http-spy] Request body (${bodyPreview.length} bytes): ${text}`,
            );
          }
        }
      } catch (e) {
        // don't let logging break the request
      }

      return oldEnd.call(this, chunk, encoding, cb);
    };

    req.on("response", (res) => {
      try {
        const respUrl = formatUrl(urlObj.toString());
        console.error(
          `[http-spy] Response ${method} ${respUrl} -> ${res.statusCode}`,
        );
        console.error(
          `[http-spy] Response headers: ${
            JSON.stringify(
              redactHeaders(res.headers),
              null,
              2,
            )
          }`,
        );
      } catch (e) {}
    });

    return req;
  };
}
// Patch http and https
http.request = makeWrapper(http.request, "http");
http.get = function (...args) {
  const req = http.request(...args);
  req.end();
  return req;
};

https.request = makeWrapper(https.request, "https");
https.get = function (...args) {
  const req = https.request(...args);
  req.end();
  return req;
};

// Optional: also patch global fetch if something uses it
if (typeof globalThis.fetch === "function") {
  const origFetch = globalThis.fetch;
  globalThis.fetch = async (input, init = {}) => {
    try {
      const url = typeof input === "string"
        ? input
        : (input && typeof input === "object" && "url" in input)
        ? input.url
        : "";
      const method = (init.method || "GET").toUpperCase();
      const rawHeaders = init.headers ||
        (typeof input === "object" && input && "headers" in input
          ? input.headers
          : {}) ||
        {};
      const headers = normalizeFetchHeaders(rawHeaders);

      // Avoid floods from base64 data URLs
      if (typeof url === "string" && url.startsWith(NOISY_DATA_PREFIX)) {
        return origFetch(input, init);
      }

      const displayUrl = formatUrl(url);
      console.error(`[http-spy] fetch ${method} ${displayUrl}`);
      console.error(
        `[http-spy] fetch request headers: ${
          JSON.stringify(
            redactHeaders(headers),
            null,
            2,
          )
        }`,
      );
    } catch {}
    const res = await origFetch(input, init);
    try {
      const respUrl = formatUrl(res.url);
      console.error(`[http-spy] fetch response ${res.status} ${respUrl}`);
      console.error(
        `[http-spy] fetch response headers: ${
          JSON.stringify(
            // res.headers is a Headers instance in fetch
            redactHeaders(Object.fromEntries(res.headers.entries())),
            null,
            2,
          )
        }`,
      );
    } catch {}
    return res;
  };
}
