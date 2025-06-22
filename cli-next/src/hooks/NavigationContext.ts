import { createContext, type JSX, useContext } from "react";

export const NavigationContext = createContext<{
  navigate: (component: JSX.Element) => void;
  component: JSX.Element;
}>({} as any);

export function useNavigation() {
  return useContext(NavigationContext);
}
