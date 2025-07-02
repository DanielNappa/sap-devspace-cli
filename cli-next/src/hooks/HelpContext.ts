import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
} from "react";

export type HelpContextValue = {
  overlay: string | null;
  setOverlay: Dispatch<SetStateAction<string | null>>;
  useDefaultOverlay: () => void;
};

export const HelpContext = createContext<HelpContextValue>({
  overlay: null,
  setOverlay: () => {},
  useDefaultOverlay: () => {},
});

export function useHelp(): HelpContextValue {
  return useContext(HelpContext);
}
