import React, { useEffect, useRef } from "react";
import styles from "./create-event.module.css";
import { initAnimationController } from "utils/animation";

export function TestAnimation() {
  const rootRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const draggable = draggableRef.current;
    const animated = animatedRef.current;
    const root = rootRef.current;

    if (!draggable || !animated || !root) {
      return;
    }

    const animationController = initAnimationController(
      0,
      (value) => (animated.style.left = `${value}px`)
    );

    let leftPad = 0;

    const onPointerMove = (event: MouseEvent) => {
      const left = event.clientX - leftPad;
      draggable.style.left = `${left}px`;
      animationController.move(left, 15);
    };

    const onTouchMove = (event: TouchEvent) => {
      const [touch] = event.touches;

      if (touch) {
        const left = touch.clientX - leftPad;
        draggable.style.left = `${left}px`;
        animationController.move(left, 15);
      }
    };

    const onRootClick = (event: MouseEvent) => {
      if (event.target === root) {
        const left = event.clientX - 20;

        draggable.style.left = `${left}px`;
        animationController.move(left, 15);
      }
    };

    const onPointerUp = () => {
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      draggable.style.cursor = "grab";
    };

    const onTouchEnd = () => {
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };

    const onPointerDown = (event: MouseEvent) => {
      const draggableRect = draggable.getBoundingClientRect();
      leftPad = event.clientX - draggableRect.left;

      window.addEventListener("mousemove", onPointerMove);
      window.addEventListener("mouseup", onPointerUp);
      draggable.style.cursor = "grabbing";
    };

    const onTouchStart = (event: TouchEvent) => {
      const [touch] = event.touches;

      if (touch) {
        const draggableRect = draggable.getBoundingClientRect();
        leftPad = touch.clientX - draggableRect.left;
        window.addEventListener("touchmove", onTouchMove);
        window.addEventListener("touchend", onTouchEnd);
      }
    };

    draggable.addEventListener("mousedown", onPointerDown);
    draggable.addEventListener("touchstart", onTouchStart);

    root.addEventListener("click", onRootClick);

    return () => {
      draggable.removeEventListener("mousedown", onPointerDown);
      draggable.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      root.removeEventListener("click", onRootClick);
    };
  }, []);

  return (
    <div className={styles.testAnimation} ref={rootRef}>
      <div className={styles.animated} ref={animatedRef} />
      <div className={styles.draggable} ref={draggableRef} />
    </div>
  );
}
