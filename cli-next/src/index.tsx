#!/usr/bin/env node
import { type Instance, render } from "ink";
import meow from "meow";
import { rootCertificateInjection } from "@/utils/utils.ts";
import App from "./App.tsx";
import { setInkRenderer } from "./utils/terminal.ts";

const cli = meow(
  `
	Usage
	  $ sap-devspace-cli

	Options
    -h, --help                      Show usage and exit
		-p, --prompt                    Send a prompt to Joule and display final output

	Examples
	  $ sap-devspace-cli -p "Does CAP support streaming?"
`,
  {
    importMeta: import.meta,
    flags: {
      help: { type: "boolean", aliases: ["h"] },
      prompt: {
        type: "string",
        aliases: ["p"],
        description: "Send a prompt to Joule and display final output",
      },
    },
  },
);
// Runs only on Win32 systems to inject system certificates to address issues with corporate networks
await rootCertificateInjection();
const instance: Instance = render(<App prompt={cli.flags.prompt} />);
setInkRenderer(instance);
