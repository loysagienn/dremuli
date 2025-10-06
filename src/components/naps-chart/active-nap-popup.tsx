import React, { memo } from "react";
import styles from "./naps-chart.module.css";
import { EventType, NapEvent } from "types";
import { MouseController } from "./mouse-controller";
import { useQuant } from "utils/quant";
import { cn } from "utils/cn";
import { useSelector } from "react-redux";
import { selectActiveTimezone } from "selectors";
import { formatTime, formatDate, getMonthDay } from "utils/date";
import { useText } from "lang/context";

type ActiveNapPopupProps = {
  napEvent: NapEvent;
  top: number;
  bottom: number;
  headerHeight: number;
  height: number;
  side: "left" | "right";
};

function ActiveNapPopup({
  napEvent,
  side,
  top,
  headerHeight,
  bottom,
  height,
}: ActiveNapPopupProps) {
  const timeZone = useSelector(selectActiveTimezone);
  const { timeDuration, activeNapPopup: text } = useText();
  const verticalSide = top - headerHeight < bottom ? "top" : "bottom";
  let popupLeft: string | undefined;
  let popupRight: string | undefined;
  let popupBottom: string | undefined;
  let popupTop: string | undefined;

  if (side === "left") {
    popupRight = "calc(100% + 8px)";
  } else {
    popupLeft = "calc(100% + 8px)";
  }

  const eventHeight = height - top - bottom;
  const offset = eventHeight < 40 ? 1 : 8;

  if (verticalSide === "top") {
    popupTop = `${offset}px`;
  } else {
    popupBottom = `${offset}px`;
  }

  const timeStartStr = formatTime(napEvent.timestamp, timeZone);
  const timeEndStr = formatTime(napEvent.endTime, timeZone);

  const title = napEvent.isNightSleep
    ? text.nightSleeping
    : napEvent.type === EventType.FellAsleep
    ? text.sleeping
    : text.awaking;

  return (
    <div
      className={cn(styles.activeNapPopup, styles[verticalSide])}
      style={{
        left: popupLeft,
        right: popupRight,
        top: popupTop,
        bottom: popupBottom,
      }}
    >
      <div className={styles.activeNapPopupTitle}>{title}</div>
      <div className={styles.activeNapPopupHeader}>
        <div
          className={styles.activeNapPopupTime}
        >{`${timeStartStr} - ${timeEndStr}`}</div>
        <div className={styles.activeNapPopupDuration}>
          {timeDuration(napEvent.duration)}
        </div>
      </div>
      {napEvent.comment && (
        <div className={styles.activeNapPopupComment}>{napEvent.comment}</div>
      )}
    </div>
  );
}

const EnhancedActiveNapPopup = memo(ActiveNapPopup);

export { EnhancedActiveNapPopup as ActiveNapPopup };
