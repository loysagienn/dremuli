import React from "react";
import { Button } from "components/button";
import { ThemeSwitcher } from "components/theme-switcher";
import { Header } from "components/header";
import Logo from "svg/logo.svg";
import styles from "./welcome-page.module.css";

export function WelcomePage() {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <ThemeSwitcher />
      </div>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Logo className={styles.logoSvg} />
        </div>

        <h1 className={styles.title}>Dremuli</h1>
        <div className={styles.caption}>Track your baby's sleep</div>
        <div className={styles.description}>
          Easily monitor your baby's sleep patterns and track naps with helpful
          insights
        </div>
        <div className={styles.buttons}>
          <Button route={{ key: "login" }} style="outline">
            Sign in
          </Button>
          <Button route={{ key: "register" }} style="action">
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
}
