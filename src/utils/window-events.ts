export function addWindowEvent<K extends keyof WindowEventMap>(
  type: K,
  listener: (event: WindowEventMap[K]) => void
) {
  if (typeof window === "undefined") {
    return;
  }

  window.addEventListener(type, listener);
}

export function removeWindowEvent<K extends keyof WindowEventMap>(
  type: K,
  listener: (event: WindowEventMap[K]) => void
) {
  if (typeof window === "undefined") {
    return;
  }

  window.removeEventListener(type, listener);
}
