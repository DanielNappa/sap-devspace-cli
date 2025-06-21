import { type JSX, useMemo, useState } from "react";
import { Box, Text, useApp } from "ink";
import LandscapeMenu from "@/components/Header/Landscape/LandscapeMenu.tsx";
import { onExit } from "@/utils/terminal.ts";

type Props = {
  prompt?: string | undefined;
};

export default function App({ prompt = "Stranger" }: Props): JSX.Element {
  const app = useApp();
  const [accepted, setAccepted] = useState<boolean>(() => false);
  const cwd = useMemo<string>(() => process.cwd(), []) as string;

  return (
    <>
      <LandscapeMenu />
    </>
  );
}
