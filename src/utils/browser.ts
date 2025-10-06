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

export function downloadJSON(data: any, filename: string) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export const isTouchDevice =
  typeof window === "undefined"
    ? false
    : window.matchMedia("(pointer: coarse)").matches;
