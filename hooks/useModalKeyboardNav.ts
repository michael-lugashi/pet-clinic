import { useEffect, useRef } from "react";

export const useModalKeyboardNav = (isOpen: boolean) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle arrow keys
      if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        return;
      }

      const modal = modalRef.current;
      if (!modal) return;

      // Get all focusable elements
      const focusableElements = modal.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) return;

      const focusableArray = Array.from(focusableElements);
      const currentIndex = focusableArray.findIndex((el) => el === document.activeElement);

      let nextIndex: number;

      // ArrowDown or ArrowRight = move forward
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        if (currentIndex === -1) {
          nextIndex = 0; // Focus first element if nothing is focused
        } else {
          nextIndex = (currentIndex + 1) % focusableArray.length;
        }
      }
      // ArrowUp or ArrowLeft = move backward
      else {
        e.preventDefault();
        if (currentIndex === -1) {
          nextIndex = focusableArray.length - 1; // Focus last element if nothing is focused
        } else {
          nextIndex = currentIndex - 1 < 0 ? focusableArray.length - 1 : currentIndex - 1;
        }
      }

      focusableArray[nextIndex]?.focus();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return modalRef;
};

