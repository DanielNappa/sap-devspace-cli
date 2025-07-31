#!/usr/bin/env node
import { type Instance, render } from "ink";
import meow from "meow";
import {
  handleSubcommandSSH,
  handleSubcommandUpdateDevSpace,
} from "@/lib/ssh/core.ts";
import { setInkRenderer } from "@/utils/terminal.ts";
import { SubcommandType } from "@/utils/types.ts";
import { createMeowSubcommand } from "@/utils/utils.ts";
import { checkForUpdates } from "@/utils/version.ts";
import App from "./App.tsx";
import "@/utils/process.ts";

const cli = meow(
  `
	Usage
	  $ sap-devspace-cli [options]
	  $ sap-devspace-cli <command>

	Options
    -h, --help                      Show usage and exit

	Commands
    ssh                             Connect to a Dev Space through SSH
    start                           Start a Dev Space
    stop                            Stop a Dev Space

	Examples
	  $ sap-devspace-cli

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

const create = createMeowSubcommand(SubcommandType.CREATE);
const ssh = createMeowSubcommand(SubcommandType.SSH);
const start = createMeowSubcommand(SubcommandType.START);
const stop = createMeowSubcommand(SubcommandType.STOP);
const deleteDevSpace = createMeowSubcommand(SubcommandType.DELETE);

if (cli.input[0] != null) {
  switch (cli.input[0]) {
    case SubcommandType.CREATE: {
      // TO-DO
      break;
    }
    case SubcommandType.SSH: {
      if (ssh.flags.help || (!ssh.flags.devspace && !ssh.flags.landscape)) {
        ssh.showHelp();
        process.exit(0);
      } else {
        await handleSubcommandSSH(ssh.flags);
      }
      break;
    }
    case SubcommandType.START: {
      if (
        start.flags.help || (!start.flags.devspace && !start.flags.landscape)
      ) {
        start.showHelp();
        process.exit(0);
      } else {
        await handleSubcommandUpdateDevSpace(start.flags, false);
      }
      break;
    }
    case SubcommandType.STOP: {
      if (stop.flags.help || (!stop.flags.devspace && !stop.flags.landscape)) {
        stop.showHelp();
        process.exit(0);
      } else {
        await handleSubcommandUpdateDevSpace(stop.flags, true);
      }
      break;
    }
    case SubcommandType.DELETE: {
      if (
        deleteDevSpace.flags.help ||
        (!deleteDevSpace.flags.devspace && !deleteDevSpace.flags.landscape)
      ) {
        deleteDevSpace.showHelp();
        process.exit(0);
      } else {
        // TO-DO
      }
      break;
    }
    default: {
      cli.showHelp();
      process.exit(0);
    }
  }
} else {
  const updateMessage = await checkForUpdates().catch(() => "") as string;
  const instance: Instance = render(
    <App prompt={cli.flags.prompt} updateMessage={updateMessage} />,
  );
  setInkRenderer(instance);
}
