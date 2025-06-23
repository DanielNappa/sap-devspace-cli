// Adaptation from https://github.com/SAP/app-studio-toolkit/tree/main/packages/app-studio-toolkit/src/devspace-manager/landscape
export type LandscapeConfig = {
  url: string;
  jwt: string | undefined;
  default?: boolean;
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
  ADD,
  DELETE,
  LOGIN,
  EXIT,
}
