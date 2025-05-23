import { strict as assert } from "assert";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { homedir } from "node:os";
import { join, parse } from "node:path";
import { URL } from "node:url";
import { remotessh } from "@sap/bas-sdk";
import { getJWT } from "@/auth";
import { log, spinner } from "@clack/prompts";
import sshConfig from "ssh-config";
import { devspaceMessages } from "@/consts";
import { ssh } from "./tunnel";
export const SSHD_SOCKET_PORT = 33765;
export const SSH_SOCKET_PORT = 443;
export default ssh;

export interface DevSpaceNode {
  label: string;
  id: string;
  landscapeURL: string;
  wsURL: string;
}

export interface SSHConfigInfo {
  name: string;
  port: string;
}

function getSSHConfigFilePath(): string {
  return (
    join(homedir(), ".ssh", "config")
  );
}

function getSSHConfigFolderPath(): string {
  return parse(getSSHConfigFilePath()).dir;
}

export async function getPK(
  landscapeURL: string,
  jwt: string,
  wsId: string,
): Promise<string> {
  return remotessh.getKey(landscapeURL, jwt, wsId);
}

function composeKeyFileName(folder: string, url: string): string {
  return join(folder, `${new URL(url).host}.key`);
}

export function savePK(pk: string, urlStr: string): string {
  //construct file named "<ws-url>.key"
  const sshFolderPath: string = getSSHConfigFolderPath();
  if (!existsSync(sshFolderPath)) {
    mkdirSync(sshFolderPath);
  }

  const fileName: string = composeKeyFileName(sshFolderPath, urlStr);
  if (existsSync(fileName)) {
    unlinkSync(fileName);
  }
  writeFileSync(fileName, `${pk}\n`, { mode: "0400", flag: "w" });
  log.info(`Private key file ${fileName} created`);
  return fileName;
}

export function deletePK(wsURL: string): void {
  const fileName: string = composeKeyFileName(getSSHConfigFolderPath(), wsURL);
  let message = `Private key file ${fileName} deleted`;
  if (existsSync(fileName)) {
    unlinkSync(fileName);
  } else {
    message = `Private key file ${fileName} doesn't exists`;
  }
  log.info(message);
}

function getSSHConfig(sshConfigFile: string): sshConfig | undefined {
  let configData: Buffer;
  if (existsSync(sshConfigFile)) {
    configData = readFileSync(sshConfigFile);
    log.info(`SSH Config file ${sshConfigFile} exists`);
  } else {
    configData = Buffer.from(``, `utf8`);
    log.info(
      `SSH Config file ${sshConfigFile} doest exist, creating new file`,
    );
  }
  return sshConfig.parse(configData.toString());
}

function composeSSHConfigSectionName(landscape: string, wsId: string): string {
  return `${new URL(landscape).host}.${wsId}`;
}

export function updateSSHConfig(
  sshKeyFilePath: string,
  devSpace: DevSpaceNode,
): SSHConfigInfo {
  const sectionName = composeSSHConfigSectionName(
    devSpace.landscapeURL,
    devSpace.id,
  );
  const sshConfigFile: string = getSSHConfigFilePath();
  const port = getRandomArbitrary();
  // get ssh config object form ssh config file
  const config = getSSHConfig(sshConfigFile) as sshConfig;
  // push to the ssh config object with the new configuration
  config.remove({ Host: sectionName });
  // keep the existing indentation of the next block
  config.push(
    sshConfig.parse(
      `Host ${sectionName}
  HostName 127.0.0.1
  Port ${port}
  IdentityFile ${sshKeyFilePath}
  User user
  NoHostAuthenticationForLocalhost yes`,
    )[0]!,
  );
  // save the SSH config object back to file
  writeFileSync(sshConfigFile, sshConfig.stringify(config));
  return { name: sectionName, port: `${port}` } as SSHConfigInfo;
}

export function removeSSHConfig(devSpace: DevSpaceNode): void {
  const sshConfigFile: string = getSSHConfigFilePath();
  // get ssh config object form ssh config file
  const config = getSSHConfig(sshConfigFile) as sshConfig;
  // remove the section by name
  config.remove({
    Host: `${composeSSHConfigSectionName(devSpace.landscapeURL, devSpace.id)}`,
  });
  //save the ssh config object back to file
  writeFileSync(sshConfigFile, sshConfig.stringify(config));
}

export async function getSSHConfigurations(
  devSpace: DevSpaceNode,
  jwt: string,
): Promise<SSHConfigInfo> {
  assert(jwt !== null);
  const spinIndicator = spinner();
  spinIndicator.start(devspaceMessages.info_obtaining_key);
  const pk = await getPK(devSpace.landscapeURL, jwt, devSpace.id);

  spinIndicator.message(devspaceMessages.info_save_pk_to_file);
  const pkFilePath = savePK(pk, devSpace.wsURL);

  spinIndicator.message(
    devspaceMessages.info_update_config_file_with_ssh_connection,
  );
  const sshConfig = updateSSHConfig(pkFilePath, devSpace);
  spinIndicator.stop(devspaceMessages.info_ssh_config_file_updated);
  return sshConfig;
}

// export async function updateRemotePlatformSetting(
//   config: SSHConfigInfo
// ): Promise<void> {
//   const remotePlatform: any = {};
//   remotePlatform[config.name] = "linux";

//   const remotePlatformsList =
//     workspace.getConfiguration().get(KEY_SSH_REMOTE_PLATFORM) || {};
//   assign(remotePlatformsList, remotePlatform);
//   await workspace
//     .getConfiguration()
//     .update(
//       KEY_SSH_REMOTE_PLATFORM,
//       remotePlatformsList,
//       ConfigurationTarget.Global
//     );
// }

// export async function cleanRemotePlatformSetting(
//   devSpace: DevSpaceNode
// ): Promise<void> {
//   const remotePlatform =
//     workspace.getConfiguration().get(KEY_SSH_REMOTE_PLATFORM) || {};
//   const sectionName = composeSSHConfigSectionName(
//     devSpace.landscapeURL,
//     devSpace.id
//   );
//   unset(remotePlatform, sectionName);

//   await workspace
//     .getConfiguration()
//     .update(
//       KEY_SSH_REMOTE_PLATFORM,
//       remotePlatform,
//       ConfigurationTarget.Global
//     );
// }

export async function runChannelClient(opt: {
  host: string;
  landscape: string;
  localPort: string;
  jwt: string;
}): Promise<void> {
  await ssh({
    host: { url: opt.host, port: `${SSH_SOCKET_PORT}` },
    client: { port: opt.localPort },
    username: "user",
    jwt: opt.jwt,
  });
    log.info(
      `Start dev-channel client for ${opt.host} on port ${SSH_SOCKET_PORT}`,
    );
}

export function getRandomArbitrary(min?: number, max?: number): number {
  max = max || 33654;
  min = min || 30432;
  // verify max is larger than min
  const tmp: number = Math.max(min, max);
  if (tmp !== max) {
    // swap min <-> max
    min = max;
    max = tmp;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
