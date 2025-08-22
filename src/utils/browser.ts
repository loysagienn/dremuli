import { Size } from "types";

export function addWindowEvent<K extends keyof WindowEventMap>(
  type: K,
  listener: (event: WindowEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
) {
  if (typeof window === "undefined") {
    return;
  }

  window.addEventListener(type, listener, options);

  return () => removeWindowEvent(type, listener, options);
}

export function removeWindowEvent<K extends keyof WindowEventMap>(
  type: K,
  listener: (event: WindowEventMap[K]) => void,
  options?: boolean | EventListenerOptions
) {
  if (typeof window === "undefined") {
    return;
  }

  window.removeEventListener(type, listener, options);
}

export function getWindowSize(): Size {
  if (typeof window === "undefined") {
    return { width: 1600, height: 1000 };
  }

  const width = window.innerWidth;
  const height = window.innerHeight;

  return { width, height };
}
