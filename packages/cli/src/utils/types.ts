import type { DevSpaceExtension } from "@sap/bas-sdk/dist/src/utils/devspace-utils";

// Adaptation from https://github.com/SAP/app-studio-toolkit/tree/main/packages/app-studio-toolkit/src/devspace-manager/landscape
export type LandscapeConfig = {
  url: string;
  jwt: string | undefined;
  default?: boolean;
};

/**
 * A generic type to track the last time a specific check was performed.
 * @template T - The type of check being performed (e.g., 'Update', 'Auth').
 */
export type CheckState<T extends string> = {
  [K in `last${T}Check`]?: string;
};

export interface LandscapeInfo {
  name: string;
  url: string;
  isLoggedIn: boolean;
  default?: boolean;
}

export type LandscapeSession = {
  name: string;
  url: string;
  jwt: string;
};

export enum LandscapeMenuOption {
  DELETE,
  LOGIN,
}

export interface DevSpaceSettings {
  [landscapeURL: string]: {
    [devSpaceKey: string]: boolean;
  };
}

export interface DevSpaceNode {
  label: string;
  id: string;
  landscapeURL: string;
  wsName: string;
  wsURL: string;
  status: string;
}

export enum DevSpaceMenuOption {
  CONNECT,
  START,
  STOP,
  DELETE,
}

export interface PackMetadata {
  allPredefinedExtensions: DevSpaceExtension[];
  predefined: {
    tagline: string;
    description: string;
    extensions: DevSpaceExtension[];
  };
  additional: {
    tagline: string;
    description: string;
    extensions: DevSpaceExtension[];
  };
}

export interface SSHConfigInfo {
  name: string;
  port: string;
  pkFilePath: string;
}

export enum SubcommandType {
  CREATE = "create",
  SSH = "ssh",
  START = "start",
  STOP = "stop",
  DELETE = "delete",
}
