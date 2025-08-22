import React, {
  memo,
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
import { PopupPosition } from "./types";
import { trackDivSize } from "utils/div-size";

type PopupProps = {
  className?: string;
  children?: ReactNode;
  targetRef?: RefObject<HTMLElement>;
  position?: PopupPosition;
  offset?: number;
};

function Popup({
  className,
  children,
  targetRef: propsTargetRef,
  position = "bottom-left",
  offset = 8,
}: PopupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const contextTargetRef = useContext(popupTargetContext);
  const targetRef = propsTargetRef || contextTargetRef;

  const hasChildren = Boolean(children);

  useLayoutEffect(() => {
    const popupNode = ref.current;
    const targetNode = targetRef?.current;

    if (hasChildren && popupNode && targetNode) {
      const { $position: $targetPosition, destroy: destroyPositionTracker } =
        trackDivPosition(targetNode);
      const { $size: $popupSize, destroy: destroySizeTracker } =
        trackDivSize(popupNode);

      const updatePosition = () => {
        const targetPosition = $targetPosition.get();
        const popupSize = $popupSize.get();

        setPopupPosition(
          targetPosition,
          popupSize,
          popupNode,
          position,
          offset
        );
      };

      const unsubscribePosition = $targetPosition.listen(updatePosition);
      const unsubscribeSize = $popupSize.listen(updatePosition);
      updatePosition();

      return () => {
        unsubscribePosition();
        unsubscribeSize();
        destroyPositionTracker();
        destroySizeTracker();
      };
    }
  }, [targetRef, hasChildren, position, offset]);

  return (
    <PopupTargetProvider value={null}>
      <TransitionRender
        className={cn(className, styles.popup, styles[position])}
        hiddenClassName={styles.hiddenPopup}
        innerRef={ref}
      >
        {children}
      </TransitionRender>
    </PopupTargetProvider>
  );
}

const EnhancedPopup = memo(Popup);

export { EnhancedPopup as Popup };
