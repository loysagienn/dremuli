import React, { memo, ReactNode, useLayoutEffect, useRef } from "react";
import { ScrollController } from "./scroll-controller";
import styles from "./scroll-content.module.css";

type StickyContentProps = {
  children: ReactNode;
  scrollController: ScrollController;
};

function StickyContent({ children, scrollController }: StickyContentProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    return scrollController.$containerSize.subscribe(({ width, height }) => {
      if (ref.current) {
        ref.current.style.width = `${width}px`;
        ref.current.style.height = `${height}px`;
      }
    });
  }, []);

  return (
    <div className={styles.staticContent} ref={ref}>
      {children}
    </div>
  );
}

const EnhancedStickyContent = memo(StickyContent);

export { EnhancedStickyContent as StickyContent };
