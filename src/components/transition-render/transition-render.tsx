import React, {
  MouseEvent,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "utils/cn";

type TransitionRenderProps = {
  className: string;
  hiddenClassName: string;
  children?: ReactNode;
  timeout?: number;
  innerRef?: RefObject<HTMLDivElement>;
  onShow?: () => void;
  onHide?: () => void;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
};

export function TransitionRender({
  className,
  hiddenClassName,
  children,
  timeout = 200,
  innerRef,
  onShow,
  onHide,
  onClick,
}: TransitionRenderProps) {
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);
  const [showTimeout, setShowTimeout] = useState<NodeJS.Timeout | null>(null);

  const [visible, setVisible] = useState(false);
  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => setVisible(false), []);

  const childrenRef = useRef(children);

  if (children) {
    childrenRef.current = children;
  }

  const needRender = Boolean(
    children || (childrenRef.current && (visible || showTimeout || hideTimeout))
  );

  useEffect(() => {
    if (!visible && children && !showTimeout) {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        setHideTimeout(null);
        show();
      } else {
        setShowTimeout(
          setTimeout(() => {
            show();
            setShowTimeout(null);
          }, 16)
        );

        if (onShow) {
          onShow();
        }
      }
    }

    if (visible && !children && !hideTimeout) {
      if (showTimeout) {
        clearTimeout(showTimeout);
        setShowTimeout(null);
      } else {
        hide();
        setHideTimeout(
          setTimeout(() => {
            setHideTimeout(null);

            if (onHide) {
              onHide();
            }
          }, timeout)
        );
      }
    }
  }, [visible, children]);

  if (!needRender) {
    return null;
  }

  return (
    <div
      className={cn(className, !visible && hiddenClassName)}
      ref={innerRef}
      onClick={onClick}
    >
      {childrenRef.current}
    </div>
  );
}
