import { Buffer } from "node:buffer";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { homedir } from "node:os";
import { join, parse } from "node:path";
import process from "node:process";
import { URL } from "node:url";
import { remotessh } from "@sap/bas-sdk";
import sshConfig from "ssh-config";
import { getRandomArbitrary } from "@/utils/utils.ts";
export const SSHD_SOCKET_PORT = 33765;
export const SSH_SOCKET_PORT = 443;

export interface DevSpaceNode {
  label: string;
  id: string;
  landscapeURL: string;
  wsName: string;
  wsURL: string;
  status: string;
}

export interface SSHConfigInfo {
  name: string;
  port: string;
  pkFilePath: string;
}

export function getSSHConfigFilePath(): string {
  return (
    join(homedir(), ".ssh", "config")
  );
}

// Instance type derived from the static `parse` return
type SSHConfig = ReturnType<typeof sshConfig.parse>;

function getSSHConfigFolderPath(): string {
  return parse(getSSHConfigFilePath()).dir;
}

export async function getPK(
  landscapeURL: string,
  jwt: string,
  wsId: string,
): Promise<string> {
  return await remotessh.getKey(landscapeURL, jwt, wsId);
}

function composeKeyFileName(folder: string, fileName: string): string {
  return join(folder, `${fileName}.key`);
}

export function savePK(pk: string, wsID: string): string {
  //construct file named "<wsID>.key"
  const sshFolderPath: string = getSSHConfigFolderPath();
  if (!existsSync(sshFolderPath)) {
    mkdirSync(sshFolderPath);
  }

  const fileName: string = composeKeyFileName(sshFolderPath, wsID);
  if (existsSync(fileName)) {
    unlinkSync(fileName);
  }
  writeFileSync(fileName, `${pk}\n`, { mode: 0o600, flag: "w" });
  return fileName;
}

export function deletePK(wsID: string): void {
  const fileName: string = composeKeyFileName(getSSHConfigFolderPath(), wsID);
  let message = `Private key file ${fileName} deleted`;
  if (existsSync(fileName)) {
    unlinkSync(fileName);
  } else {
    message = `Private key file ${fileName} doesn't exist`;
  }
  console.log(message);
}

function getSSHConfig(sshConfigFile: string): SSHConfig {
  let configData: Buffer;
  if (existsSync(sshConfigFile)) {
    configData = readFileSync(sshConfigFile);
  } else {
    configData = Buffer.from(``, `utf8`);
    console.log(
      `SSH Config file ${sshConfigFile} doesn't exist, creating new file`,
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
  newHostAlias?: string,
): SSHConfigInfo {
  const sshConfigFile: string = getSSHConfigFilePath();
  const port: number = getRandomArbitrary();
  if (newHostAlias != null && typeof newHostAlias === "string") {
    // get ssh config object from the ssh config file
    const config = getSSHConfig(sshConfigFile) as SSHConfig;
    // push to the ssh config object with the new configuration
    config.remove({ Host: newHostAlias });
    // keep the existing indentation of the next block
    config.push(
      sshConfig.parse(
        `Host ${newHostAlias}
  User user
  ProxyCommand ${
          process.argv[1]
        } ssh --landscape ${devSpace.landscapeURL} --devspace ${devSpace.wsName}
  UserKnownHostsFile=/dev/null
  StrictHostKeyChecking no
  NoHostAuthenticationForLocalhost yes
  LogLevel error
  IdentityFile ${sshKeyFilePath}\n`,
      )[0]!,
    );
    // save the SSH config object back to file
    writeFileSync(sshConfigFile, sshConfig.stringify(config));
  }
  return { name: newHostAlias, port: `${port}` } as SSHConfigInfo;
}

export function removeSSHConfig(devSpace: DevSpaceNode): void {
  const sshConfigFile: string = getSSHConfigFilePath();
  // get ssh config object form ssh config file
  const config = getSSHConfig(sshConfigFile) as SSHConfig;
  // remove the section by name
  config.remove({
    Host: `${composeSSHConfigSectionName(devSpace.landscapeURL, devSpace.id)}`,
  });
  //save the ssh config object back to file
  writeFileSync(sshConfigFile, sshConfig.stringify(config));
}
