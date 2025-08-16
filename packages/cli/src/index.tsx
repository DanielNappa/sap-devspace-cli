#!/usr/bin/env -S node --no-warnings --use-system-ca --enable-source-maps
import process from "node:process";
import { type Instance, render } from "ink";
import meow from "meow";
import { handleSubcommandSSH } from "@/lib/ssh/core.ts";
import {
  handleSubcommandCreate,
  handleSubcommandDelete,
  handleSubcommandUpdate,
} from "@/lib/devspace/core.ts";
import { ErrorBoundary } from "@/components/UI/ErrorBoundary.tsx";
import { captureException } from "@/utils/errors.ts";
import { setInkRenderer } from "@/utils/terminal.ts";
import { SubcommandType } from "@/utils/types.ts";
import { createMeowSubcommand } from "@/utils/utils.ts";
import { checkForUpdates } from "@/utils/version.ts";
import App from "./App.tsx";
import "@/utils/process.ts";

const cli = meow(
  `
	Usage
	  $ ds [options]
	  $ ds <command>

	Options
    -h, --help                      Show usage and exit

	Commands
    ssh                             Connect to a Dev Space through SSH
    start                           Start a Dev Space
    stop                            Stop a Dev Space
    delete                          Delete a Dev Space

	Examples
	  $ ds

	Learn More
	  Use \`ds <command> [-h | --help]\` for usage about a command.
`,
  {
    importMeta: import.meta,
    flags: {
      help: { type: "boolean", aliases: ["h"] },
    },
  },
);

const ssh = createMeowSubcommand(SubcommandType.SSH);
const start = createMeowSubcommand(SubcommandType.START);
const stop = createMeowSubcommand(SubcommandType.STOP);
const deleteDevSpace = createMeowSubcommand(SubcommandType.DELETE);

if (cli.input[0] != null) {
  try {
    switch (cli.input[0]) {
      case SubcommandType.CREATE: {
        await handleSubcommandCreate(cli.flags);
        break;
      }
      case SubcommandType.SSH: {
        if (ssh.flags.help || (!ssh.flags.devspace || !ssh.flags.landscape)) {
          ssh.showHelp();
          process.exit(0);
        } else {
          await handleSubcommandSSH(ssh.flags);
        }
        break;
      }
      case SubcommandType.START: {
        if (
          start.flags.help || (!start.flags.devspace || !start.flags.landscape)
        ) {
          start.showHelp();
          process.exit(0);
        } else {
          await handleSubcommandUpdate(start.flags, false);
        }
        break;
      }
      case SubcommandType.STOP: {
        if (
          stop.flags.help || (!stop.flags.devspace || !stop.flags.landscape)
        ) {
          stop.showHelp();
          process.exit(0);
        } else {
          await handleSubcommandUpdate(stop.flags, true);
        }
        break;
      }
      case SubcommandType.DELETE: {
        if (
          deleteDevSpace.flags.help ||
          (!deleteDevSpace.flags.devspace || !deleteDevSpace.flags.landscape)
        ) {
          deleteDevSpace.showHelp();
          process.exit(0);
        } else {
          await handleSubcommandDelete(deleteDevSpace.flags);
        }
        break;
      }
      default: {
        cli.showHelp();
        process.exit(0);
      }
    }
  } catch (error) {
    captureException(error, {
      component: "cli",
      action: "subcommand",
      subcommand: cli.input[0],
    });
    console.error("Command failed:", error);
    process.exit(1);
  }
} else {
  try {
    const updateMessage = await checkForUpdates().catch((error: unknown) => {
      captureException(error, {
        component: "cli",
        action: "checkForUpdates",
      });
      return "";
    }) as string;

    const instance: Instance = render(
      <ErrorBoundary
        context={{
          component: "App",
          hasUpdateMessage: !!updateMessage,
        }}
      >
        <App updateMessage={updateMessage} />
      </ErrorBoundary>,
    );
    setInkRenderer(instance);
  } catch (error) {
    captureException(error, {
      component: "cli",
      action: "renderApp",
    });
    console.error("Failed to start application:", error);
    process.exit(1);
  }
}
