import { useEffect } from "react";

/**
 * Custom hook to disable/enable document scrolling
 * @param disabled - When true, disables document scrolling. When false, enables it.
 */
export const useDisableScroll = (disabled: boolean) => {
  useEffect(() => {
    if (disabled) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [disabled]);
};

