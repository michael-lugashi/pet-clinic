import { useEffect } from "react";

/**
 * Custom hook to handle Escape key press
 * @param isEnabled - When true, listens for Escape key. When false, removes listener.
 * @param onEscape - Callback function to execute when Escape key is pressed
 */
export const useHandleEscape = (isEnabled: boolean, onEscape: () => void) => {
  useEffect(() => {
    if (!isEnabled) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onEscape();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isEnabled, onEscape]);
};
