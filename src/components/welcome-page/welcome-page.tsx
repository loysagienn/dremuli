import React from "react";
import { useSelector } from "react-redux";
import { selectTheme, selectUser } from "selectors";
import { Route, Link } from "components/router";
import styles from "./welcome-page.module.css";

export function WelcomePage() {
  const theme = useSelector(selectTheme);
  const user = useSelector(selectUser);

  return (
    <div className={styles.root}>
      <div className={styles.logo} />

      <h1 className={styles.title}>Dremuli</h1>
      <div className={styles.caption}>Track your baby's sleep</div>
      <div className={styles.description}>
        Easily monitor your baby's sleep patterns and track naps with helpful
        insights
      </div>
      <div>
        <Link route={{ key: "login" }}>Login</Link>
      </div>
      <div>
        <Link route={{ key: "register" }}>Register</Link>
      </div>
      <div>
        <Link route={{ key: "settings" }}>Settings</Link>
      </div>
    </div>
  );
}
