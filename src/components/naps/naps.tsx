import React from "react";
import styles from "./naps.module.css";
import { cn } from "utils/cn";
import { formatDateTime } from "utils/date";
import { Button } from "components/button";
import { useSelector } from "react-redux";
import { selectNapsReverse, selectTimeZone } from "selectors";

type NapsProps = {
  className?: string;
};

export function Naps({ className }: NapsProps) {
  const naps = useSelector(selectNapsReverse);
  const timeZone = useSelector(selectTimeZone);

  return (
    <div className={cn(className, styles.root)}>
      <div className={styles.content}>
        {naps.map((nap) => (
          <div className={styles.nap} key={nap.id}>
            <div>{`From: ${formatDateTime(nap.startTime, timeZone)}`}</div>
            {nap.endTime && (
              <div>{`To: ${formatDateTime(nap.endTime, timeZone)}`}</div>
            )}
          </div>
        ))}

        <Button route={{ key: "create_nap" }}>Create nap</Button>
      </div>
    </div>
  );
}
