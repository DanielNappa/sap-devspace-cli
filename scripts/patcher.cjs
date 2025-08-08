import { Buffer } from "node:buffer";
const http = require("node:http");
const https = require("node:https");
const { URL } = require("node:url");

const NOISY_DATA_PREFIX = "data:application/octet-stream;base64";
function formatUrl(u) {
  const s = String(u);
  return s.length > 200
    ? s.slice(0, 200) + "…(truncated " + (s.length -
      200) +
      " chars)"
    : s;
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

    // Optional: redact secrets unless you explicitly want to see them
    // const redactedHeaders = { ...headers, authorization: headers.authorization ? '[REDACTED]' : undefined };

    // Call original to get the request object
    const req = original.call(this, urlObj, opts, callback);

    // Capture request body (only for small payloads; guard size in practice)
    const chunks = [];
    const oldWrite = req.write;
    const oldEnd = req.end;

    req.write = function (chunk, encoding, cb) {
      if (chunk) {
        chunks.push(
          Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding),
        );
      }
      return oldWrite.call(this, chunk, encoding, cb);
    };

    req.end = function (chunk, encoding, cb) {
      if (chunk) {
        chunks.push(
          Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding),
        );
      }
      const bodyPreview = chunks.length ? Buffer.concat(chunks) : null;

      // Log the request once we know the final body
      try {
        // Print request line and headers
        // If you want to see auth headers, log `headers`; otherwise redact
        if (typeof url === "string" && url.startsWith(NOISY_DATA_PREFIX)) {
          // Skip logging entirely for noisy data: URLs return origFetch(input, init); } const displayUrl = formatUrl(url);
          console.error(`[http-spy] fetch ${method} ${displayUrl}`);
          console.error(
            `[http-spy] fetch request headers: ${
              JSON.stringify(headers, null, 2)
            }`,
          );
        }
        if (bodyPreview && bodyPreview.length > 0) {
          const printable = bodyPreview.length > 4096
            ? bodyPreview.slice(0, 4096)
            : bodyPreview;
          console.error(
            `[http-spy] Request body (${bodyPreview.length} bytes): ${
              printable.toString("utf8")
            }`,
          );
        }
      } catch (e) {
        // don't let logging break the request
      }

      return oldEnd.call(this, chunk, encoding, cb);
    };

    req.on("response", (res) => {
      try {
        const respUrl = formatUrl(res.url);
        console.error(`[http-spy] fetch response ${res.status} ${respUrl}`);
        console.error(`[http-spy] fetch response headers:
${JSON.stringify(Object.fromEntries(res.headers.entries()), null, 2)}`);
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
      const url = typeof input === "string" ? input : input.url;
      const method = (init.method || "GET").toUpperCase();
      const headers = init.headers ||
        (typeof input !== "string" && input.headers) || {};
      console.error(`[http-spy] fetch ${method} ${url}`);
      console.error(
        `[http-spy] fetch request headers: ${JSON.stringify(headers, null, 2)}`,
      );
    } catch {}
    const res = await origFetch(input, init);
    try {
      console.error(`[http-spy] fetch response ${res.status} ${res.url}`);
      console.error(
        `[http-spy] fetch response headers: ${
          JSON.stringify(Object.fromEntries(res.headers.entries()), null, 2)
        }`,
      );
    } catch {}
    return res;
  };
}
