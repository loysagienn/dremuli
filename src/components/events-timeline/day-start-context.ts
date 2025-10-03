import { createContext, RefObject, useCallback, useMemo, useRef } from "react";
import { NapEvent } from "types";

type DayStartNode = {
  node: HTMLDivElement;
  napEvent: NapEvent;
  bottom: number;
};

type DayStartContext = {
  dayStartNodes: DayStartNode[];
  registerDayStartNode: (node: HTMLDivElement, napEvent: NapEvent) => void;
  unregisterDayStartNode: (node: HTMLDivElement) => void;
};

export const dayStartContext = createContext<DayStartContext | undefined>(
  undefined
);

const { Provider } = dayStartContext;

export { Provider as DayStartProvider };

export const useDayStartContextValue = (
  eventsContainerRef: RefObject<HTMLDivElement>
): DayStartContext => {
  const nodesRef = useRef<DayStartNode[]>([]);

  const registerDayStartNode = useCallback(
    (node: HTMLDivElement, napEvent: NapEvent) => {
      const containerNode = eventsContainerRef.current;

      if (!containerNode) {
        return;
      }

      const containerRect = containerNode.getBoundingClientRect();
      const nodeRect = node.getBoundingClientRect();
      const bottom = containerRect.bottom - nodeRect.bottom;

      nodesRef.current.push({ node, napEvent, bottom });

      nodesRef.current.sort((a, b) => a.bottom - b.bottom);
    },
    []
  );

  const unregisterDayStartNode = useCallback((node: HTMLDivElement) => {
    const index = nodesRef.current.findIndex(
      (nodeItem) => nodeItem.node === node
    );

    if (index !== -1) {
      nodesRef.current.splice(index, 1);
    }
  }, []);

  return useMemo(
    () => ({
      dayStartNodes: nodesRef.current,
      registerDayStartNode,
      unregisterDayStartNode,
    }),
    []
  );
};
