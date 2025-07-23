import { useRef, useCallback, useLayoutEffect } from "react";

/**
 * Returns a stable callback reference that always calls the latest version of the provided function.
 * Useful when you want to avoid re-creating closures on every render, but still call the latest logic.
 */
export function usePersistentCallback<T extends (...args: any[]) => any>(
  fn: T
): T {
  const fnRef = useRef(fn);

  // Update the ref to point to the latest function
  useLayoutEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  // Return a stable callback that calls the current ref
  const stableCallback = useCallback(
    (...args: Parameters<T>): ReturnType<T> => {
      return fnRef.current(...args);
    },
    []
  );

  return stableCallback as T;
}
