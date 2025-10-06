import React, { memo, useMemo } from "react";
import styles from "./naps-chart.module.css";
import { NapEvent } from "types";
import { MouseController } from "./mouse-controller";
import { useQuant } from "utils/quant";
import { cn } from "utils/cn";
import { ActiveNapPopup } from "./active-nap-popup";

type ActiveNapProps = {
  napEvent: NapEvent;
  mouseController: MouseController;
  headerHeight: number;
  height: number;
  width: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
};

export function ActiveNap({
  napEvent,
  mouseController,
  headerHeight,
  height,
  left,
  right,
  top,
  bottom,
  width,
}: ActiveNapProps) {
  const mousePosition = useQuant(mouseController.$mousePosition);

  if (!mousePosition) {
    return null;
  }

  const [mouseX, mouseY] = mousePosition;

  const isInRange =
    mouseY >= top - headerHeight && mouseY <= height - headerHeight - bottom;

  const isStart = top - headerHeight === 0;
  const isEnd = bottom === 0;

  const mouseLeft = mouseX;
  const mouseRight = width - mouseX;

  let popupSide: "left" | "right" = "left";

  if (mouseLeft < 350 || mouseRight < 350) {
    if (mouseLeft > mouseRight) {
      popupSide = "left";
    } else {
      popupSide = "right";
    }
  } else {
    if (mouseLeft > 350) {
      popupSide = "left";
    } else {
      popupSide = "right";
    }
  }

  return (
    <div
      className={cn(
        styles.activeNapEvent,
        isStart && styles.isStart,
        isEnd && styles.isEnd
      )}
    >
      {isInRange && (
        <ActiveNapPopup
          napEvent={napEvent}
          side={popupSide}
          top={top}
          bottom={bottom}
          headerHeight={headerHeight}
          height={height}
        />
      )}
    </div>
  );
}
