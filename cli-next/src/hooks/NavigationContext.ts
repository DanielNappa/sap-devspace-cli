import { createContext, type JSX, useContext } from "react";
import { type AppProps } from "ink";

export const NavigationContext = createContext<{
  app: AppProps;
  navigate: (component: JSX.Element) => void;
  component: JSX.Element;
  goBack: () => void;
}>({} as any);

export function useNavigation() {
  return useContext(NavigationContext);
}
