import { useEffect, useRef } from "react";

export type ShortcutHandler = {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  handler: (event: KeyboardEvent) => void;
  preventDefault?: boolean;
  enabled?: boolean;
};

export const useKeyboardShortcuts = (shortcuts: ShortcutHandler[]) => {
  const shortcutsRef = useRef(shortcuts);

  // Update the ref when shortcuts change
  useEffect(() => {
    shortcutsRef.current = shortcuts;
  }, [shortcuts]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input fields (except for / and ?)
      const target = event.target as HTMLElement;
      const isInputField = target.tagName === "INPUT" || target.tagName === "TEXTAREA";
      const isSlashOrQuestion = event.key === "/" || event.key === "?";

      if (isInputField && !isSlashOrQuestion) return;

      for (const shortcut of shortcutsRef.current) {
        if (shortcut.enabled === false) continue;

        const keyMatches = event.key === shortcut.key || event.key.toLowerCase() === shortcut.key.toLowerCase();
        const modifiersMatch =
          (shortcut.ctrlKey === undefined || event.ctrlKey === shortcut.ctrlKey) &&
          (shortcut.shiftKey === undefined || event.shiftKey === shortcut.shiftKey);

        if (keyMatches && modifiersMatch) {
          if (shortcut.preventDefault !== false) {
            event.preventDefault();
          }
          shortcut.handler(event);
          break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
};
