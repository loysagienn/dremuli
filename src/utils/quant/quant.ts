import { MutableQuant, Listener } from "./types";

export function quant<TValue = unknown>(
  defaultValue: TValue
): MutableQuant<TValue> {
  let value = defaultValue;
  const listeners = new Set<Listener<TValue>>();
  const strictListeners = new Set<Listener<TValue>>();

  const get = () => value;

  const listen = (listener: Listener<TValue>) => {
    const cb = (value: TValue) => listener(value);

    listeners.add(cb);

    return () => listeners.delete(cb);
  };

  const listenStrict = (listener: Listener<TValue>) => {
    const cb = (value: TValue) => listener(value);

    strictListeners.add(cb);

    return () => strictListeners.delete(cb);
  };

  const subscribe = (listener: Listener<TValue>) => {
    listener(value);

    return listen(listener);
  };

  const set = (newValue: TValue) => {
    const isSameValue = newValue === value;

    value = newValue;

    strictListeners.forEach((listener) => listener(value));

    if (!isSameValue) {
      listeners.forEach((listener) => listener(value));
    }
  };

  const destroy = () => {
    listeners.clear();
    strictListeners.clear();
  };

  return {
    get,
    set,
    listen,
    listenStrict,
    subscribe,
    destroy,
  };
}
