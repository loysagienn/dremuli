import { useSyncExternalStore } from "react";
import { Quant, QuantValue } from "./types";

export function useQuant<TQuant extends Quant>(
  $quant: TQuant
): QuantValue<TQuant> {
  return useSyncExternalStore(
    $quant.listen,
    $quant.get,
    $quant.get
  ) as QuantValue<TQuant>;
}
