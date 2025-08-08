import { quant } from "./quant";
import { Quant, ComputedQuant, QuantsValues } from "./types";

function getTopLevelDependencies(deps: Quant[]) {
  const topLevelDeps = new Set(deps);

  const checkDependencies = (deps: Quant[]) => {
    if (deps.length === 0) {
      return;
    }

    deps.forEach((quant) => {
      if (topLevelDeps.has(quant)) {
        topLevelDeps.delete(quant);
      }
    });

    updateNested(deps);
  };

  const updateNested = (deps: Quant[]) => {
    const nested: Quant[] = [];

    deps.forEach((quant: ComputedQuant) => {
      if (quant.dependencies) {
        nested.push(...quant.dependencies);
      }
    });

    checkDependencies(nested);
  };

  updateNested(deps);

  return Array.from(topLevelDeps);
}

function sameValues(a: any[], b: any[]) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
}

export function computedQuant<TQuants extends Quant[], TValue = unknown>(
  dependencies: [...TQuants],
  getter: (...values: QuantsValues<TQuants>) => TValue
): ComputedQuant<TValue, TQuants> {
  const getValues = () =>
    dependencies.map((quant) => quant.get()) as QuantsValues<TQuants>;

  let currentValues = getValues();

  const {
    get,
    set,
    listen,
    listenStrict,
    subscribe,
    destroy: destroyQuant,
  } = quant(getter(...currentValues));

  const updateValue = () => {
    const values = getValues();

    if (sameValues(currentValues, values)) {
      set(get());

      return;
    }

    currentValues = values;

    set(getter(...values));
  };

  const topLevelDeps = getTopLevelDependencies(dependencies);

  const unlisteners = topLevelDeps.map((quant) =>
    quant.listenStrict(updateValue)
  );

  const destroy = () => {
    unlisteners.forEach((unlistener) => unlistener());
    destroyQuant();
    dependencies = null;
  };

  return {
    get,
    listen,
    listenStrict,
    subscribe,
    dependencies,
    destroy,
  };
}

// export const makeTest = () => {
//   const $a = quant(0);
//   const $b = quant("");

//   const $c = computedQuant([$a, $b], (a, b) => {
//     console.log("calc c");
//     return !a && !b;
//   });

//   const $d = computedQuant([$a, $c], (a, c) => {
//     console.log("calc d");
//     if (c) {
//       return a;
//     }

//     return 2;
//   });

//   $a.subscribe((a) => console.log("a", a));
//   $b.subscribe((b) => console.log("b", b));
//   $c.subscribe((c) => console.log("c", c));
//   $d.subscribe((d) => console.log("d", d));

//   console.log("$a.set(1)");
//   $a.set(1);
//   console.log('$b.set("a")');
//   $b.set("a");
// };

// makeTest();
