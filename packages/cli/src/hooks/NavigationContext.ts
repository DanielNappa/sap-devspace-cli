import {
  createContext,
  createElement,
  Fragment,
  type JSX,
  useContext,
} from "react";
import { type AppProps } from "ink";

export const NavigationContext = createContext<{
  app: AppProps;
  navigate: (component: JSX.Element) => void;
  component: JSX.Element;
  goBack: () => void;
}>({
  app: {} as AppProps,
  navigate: () => {
    throw new Error("NavigationContext not initialized");
  },
  component: createElement(Fragment, {}),
  goBack: () => {
    throw new Error("NavigationContext not initialized");
  },
});

export function useNavigation() {
  return useContext(NavigationContext);
}
