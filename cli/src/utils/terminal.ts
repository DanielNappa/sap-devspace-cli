/*
 * Adopted directly from
 * https://github.com/openai/codex/blob/main/codex-cli/src/utils/terminal.ts
 */
import type { Instance } from "ink";

let inkRenderer: Instance | null = null;

// Track whether the clean‑up routine has already executed so repeat calls are
// silently ignored. This can happen when different exit paths (e.g. the raw
// Ctrl‑C handler and the process "exit" event) both attempt to tidy up.
let didRunOnExit = false;

export function setInkRenderer(renderer: Instance): void {
  inkRenderer = renderer;
}

export function clearTerminal(): void {
  // When using the alternate screen the content never scrolls, so we rarely
  // need a full clear. Still expose the behaviour when explicitly requested
  // (e.g. via Ctrl‑L) but avoid unnecessary clears on every render to minimise
  // flicker.
  if (inkRenderer) {
    inkRenderer.clear();
  }
  // Also clear scrollback and primary buffer to ensure a truly blank slate
  process.stdout.write("\x1b[3J\x1b[H\x1b[2J");
}

export function onExit(): void {
  // Ensure the clean‑up logic only runs once even if multiple exit signals
  // (e.g. Ctrl‑C data handler *and* the process "exit" event) invoke this
  // function. Re‑running the sequence is mostly harmless but can lead to
  // duplicate log messages and increases the risk of confusing side‑effects
  // should future clean‑up steps become non‑idempotent.
  if (didRunOnExit) {
    return;
  }

  didRunOnExit = true;

  // First make sure Ink is properly unmounted so it can restore any terminal
  // state it modified (e.g. raw‑mode on stdin). Failing to do so leaves the
  // terminal in raw‑mode after the Node process has exited which looks like
  // a “frozen” shell – no input is echoed and Ctrl‑C/Z no longer work. This
  // regression was introduced when we switched from `inkRenderer.unmount()`
  // to letting `process.exit` terminate the program a few commits ago. By
  // explicitly unmounting here we ensure Ink performs its clean‑up logic
  // *before* we restore the primary screen buffer.
  if (inkRenderer) {
    try {
      inkRenderer.unmount();
    } catch {
      /* best‑effort – continue even if Ink throws */
    }
  }
}
