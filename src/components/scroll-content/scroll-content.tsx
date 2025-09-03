import React, { memo, ReactNode, useEffect, useRef } from "react";
import styles from "./scroll-content.module.css";
import { cn } from "utils/cn";
import { ScrollController } from "./scroll-controller";

type ScrollContentProps = {
  scrollController: ScrollController;
  className?: string;
  children?: ReactNode;
};

function ScrollContent({
  scrollController,
  className,
  children,
}: ScrollContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerNode = containerRef.current;
    const scrollNode = scrollRef.current;

    if (containerNode && scrollNode) {
      scrollController.init(containerNode, scrollNode);
    }
  }, []);

  return (
    <div
      className={cn(
        className,
        styles.root,
        styles[scrollController.direction],
        scrollController.snappingEnabled && styles.snappingEnabled
      )}
    >
      <div className={styles.container} ref={containerRef}>
        <div className={styles.scrollable} ref={scrollRef}>
          {children}
        </div>
      </div>
    </div>
  );
}

const EnhancedScrollContent = memo(ScrollContent);

export { EnhancedScrollContent as ScrollContent };
