import { useEffect, useRef } from "react";

interface UseClickOutsideCallback {
  (): void;
}

// interface UseClickOutsideRef {
//   current: HTMLElement | null;
// }

export default function useClickOutside(
  callbackFn: UseClickOutsideCallback
): React.RefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement | null>(null);
  // Close the options list when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callbackFn?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callbackFn]);

  //
  return ref;
}
