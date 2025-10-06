import React, { memo, useMemo } from "react";
import styles from "./naps-chart.module.css";
import { MouseController } from "./mouse-controller";
import { useQuant } from "utils/quant";
import { isTouchDevice } from "utils/browser";

type MouseContentProps = {
  mouseController: MouseController;
  height: number;
  headerHeight: number;
  width: number;
};

const MINUTE_MS = 1000 * 60;
const HOUR_MS = MINUTE_MS * 60;

function MouseContent({
  mouseController,
  height,
  headerHeight,
  width,
}: MouseContentProps) {
  const mouseTime = useQuant(mouseController.$mouseTime);
  const mousePosition = useQuant(mouseController.$mousePosition);
  const activeNapEvent = useQuant(mouseController.$activeNapEvent);

  const mouseTimeStr = useMemo(() => {
    if (!mouseTime) {
      return "";
    }

    const hours = Math.floor(mouseTime / HOUR_MS);
    const minutes = Math.floor((mouseTime % HOUR_MS) / MINUTE_MS);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }, [mouseTime]);

  const mouseTop = mousePosition ? mousePosition[1] + headerHeight : 0;

  const labelStyles = useMemo(() => {
    if (!mousePosition) {
      return {};
    }

    const [mouseX] = mousePosition;

    return {
      left: mouseX + 12,
    };
  }, [mousePosition, width]);

  if (mouseTime === null || mousePosition === null) {
    return null;
  }

  if (activeNapEvent) {
    return null;
  }

  return (
    <>
      {!isTouchDevice && (
        <div className={styles.mouseTime} style={{ top: mouseTop }}>
          <div className={styles.mouseTimeLabel} style={labelStyles}>
            {mouseTimeStr}
          </div>
        </div>
      )}
    </>
  );
}

const EnhancedMouseContent = memo(MouseContent);

export { EnhancedMouseContent as MouseContent };
