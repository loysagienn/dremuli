import React from "react";
import styles from "./home.module.css";
import { Header } from "components/header";
import { Button } from "components/button";
import { Naps } from "components/naps";
import { useSelector } from "react-redux";
import { selectNaps, selectTimeZone } from "selectors";
import { formatDateTime } from "utils/date";

const formatter = new Intl.DateTimeFormat("en-US", {
  month: "short", // or 'long' for full month
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false, // set to true if you want AM/PM
});

export function Home() {
  const naps = useSelector(selectNaps);
  const timeZone = useSelector(selectTimeZone);

  return (
    <div className={styles.root}>
      <Header />
      <Naps className={styles.content} />
    </div>
  );
}
