import React, {
  ReactNode,
  RefObject,
  useContext,
  useLayoutEffect,
  useRef,
} from "react";
import { popupTargetContext, PopupTargetProvider } from "./popup-target";
import { TransitionRender } from "components/transition-render";
import styles from "./popup.module.css";
import { cn } from "utils/cn";
import { trackDivPosition } from "utils/div-position";
import { setPopupPosition } from "./set-popup-position";

type PopupProps = {
  className?: string;
  children?: ReactNode;
  targetRef?: RefObject<HTMLElement>;
};

export function Popup({
  className,
  children,
  targetRef: propsTargetRef,
}: PopupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const contextTargetRef = useContext(popupTargetContext);
  const targetRef = propsTargetRef || contextTargetRef;

  useLayoutEffect(() => {
    const popupNode = ref.current;
    const targetNode = targetRef?.current;

    if (children && popupNode && targetNode) {
      const { $position: $targetPosition, destroy } =
        trackDivPosition(targetNode);

      const unsubscribePosition = $targetPosition.subscribe((targetPosition) =>
        setPopupPosition(targetPosition, popupNode)
      );

      return () => {
        unsubscribePosition();
        destroy();
      };
    }
  }, [targetRef, children]);

  return (
    <PopupTargetProvider value={null}>
      <TransitionRender
        className={cn(className, styles.popup)}
        hiddenClassName={styles.hiddenPopup}
        innerRef={ref}
      >
        {children}
      </TransitionRender>
    </PopupTargetProvider>
  );
}
