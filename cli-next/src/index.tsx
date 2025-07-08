#!/usr/bin/env node
import { type Instance, render } from "ink";
import meow from "meow";
import { handleSubcommandSSH } from "@/lib/ssh/core.ts";
import { rootCertificateInjection } from "@/utils/utils.ts";
import { setInkRenderer } from "@/utils/terminal.ts";
import App from "./App.tsx";
import "@/utils/process.ts";

const cli = meow(
  `
	Usage
	  $ sap-devspace-cli [options]
	  $ sap-devspace-cli <command>

	Options
    -h, --help                      Show usage and exit
    -p, --prompt <prompt>           Send a prompt to Joule and display final output

	Commands
    ssh                             Connect to a Dev Space through SSH

	Examples
	  $ sap-devspace-cli
	  $ sap-devspace-cli -p "Does CAP support streaming?"

	Learn More
	  Use \`sap-devspace-cli <command> [-h | --help]\` for usage about a command.
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

const ssh = meow(
  `
	Usage
	  $ sap-devspace-cli ssh [options]

	Options
    -h, --help                      Show usage and exit
    -l, --landscape <URL>           The full URL of the target landscape 
    -d, --devspace  <name>          The display name of the target Dev Space

	Examples
	  $ sap-devspace-cli ssh -l https://...applicationstudio.cloud.sap -d MyDevSpace
`,
  {
    importMeta: import.meta,
    flags: {
      help: { type: "boolean", aliases: ["h"] },
      landscape: {
        type: "string",
        aliases: ["l"],
        description: "The full URL of the target landscape",
      },
      devspace: {
        type: "string",
        aliases: ["d"],
        description: "The display name of the target Dev Space",
      },
    },
  },
);

// Runs only on Win32 systems to inject system certificates to address issues with corporate networks
await rootCertificateInjection();

// Hand off to the SSH command
if (cli.input[0] === "ssh") {
  if (ssh.flags.help || (!ssh.flags.devspace && !ssh.flags.landscape)) {
    ssh.showHelp();
    process.exit(0);
  } else {
    await handleSubcommandSSH(ssh.flags);
  }
} else {
  const instance: Instance = render(<App prompt={cli.flags.prompt} />);
  setInkRenderer(instance);
}
