import { getLandscapesConfig } from "@/components/Landscape/utils.ts";

export async function handleSSHCore(
  flags: {
    help: boolean | undefined;
    landscape: string | undefined;
    devspace: string | undefined;
  } & Record<string, unknown>,
): Promise<void> {
  // const landscapeConfig = getLandscapesConfig();
}
