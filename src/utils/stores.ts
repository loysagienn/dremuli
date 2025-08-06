import { effect, atom, AnyStore, StoreValue, ReadableAtom } from "nanostores";

export type StoreValues<Stores extends AnyStore[]> = {
  [Index in keyof Stores]: StoreValue<Stores[Index]>;
};

export function createComputedStore<OriginStores extends AnyStore[], Result>(
  stores: [...OriginStores],
  cb: (...values: StoreValues<OriginStores>) => Result
): [ReadableAtom<Result>, () => void] {
  const $store = atom(null);

  const destroy = effect(stores, (...values) => {
    $store.set(cb(...values));
  });

  return [$store, destroy];
}
