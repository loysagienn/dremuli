import React from "react";
import styles from "./home.module.css";
import { Header } from "components/header";
import { Button } from "components/button";
import { useSelector } from "react-redux";
import { selectNaps } from "selectors";

const formatter = new Intl.DateTimeFormat("en-US", {
  month: "short", // or 'long' for full month
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false, // set to true if you want AM/PM
});

export function Home() {
  const naps = useSelector(selectNaps);

  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.content}>
        <Button route={{ key: "create_nap" }}>Create nap</Button>
        {naps.map((nap) => (
          <div className={styles.nap} key={nap.id}>
            <div>{`From: ${formatter.format(nap.startTime)}`}</div>
            {nap.endTime && <div>{`To: ${formatter.format(nap.endTime)}`}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
