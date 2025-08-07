export type Listener<TValue = unknown> = (value: TValue) => void;

export type Listen<TValue = unknown> = (
  listener: Listener<TValue>
) => () => void;

export type MutableQuant<TValue = unknown> = {
  get: () => TValue;
  set: (value: TValue) => void;
  listen: Listen<TValue>;
  listenStrict: Listen<TValue>;
  subscribe: Listen<TValue>;
  destroy: () => void;
};

export type ComputedQuant<TValue = unknown, TQuants extends Quant[] = any> = {
  get: () => TValue;
  listen: Listen<TValue>;
  listenStrict: Listen<TValue>;
  subscribe: Listen<TValue>;
  dependencies: [...TQuants];
  destroy: () => void;
};

export type Quant<TValue = unknown> =
  | MutableQuant<TValue>
  | ComputedQuant<TValue>;

export type QuantValue<TQuant extends Quant> = ReturnType<TQuant["get"]>;

export type QuantsValues<TQuants extends Quant[]> = {
  [Index in keyof TQuants]: QuantValue<TQuants[Index]>;
};
