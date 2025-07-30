import React from "react";
import { Button } from "components/button";
import { ThemeSwitcher } from "components/theme-switcher";
import Logo from "svg/logo.svg";
import styles from "./welcome-page.module.css";
import { useText } from "lang/context";
import { LangSwitcher } from "components/lang-switcher";

export function WelcomePage() {
  const { welcomePage } = useText();

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <LangSwitcher />
        <ThemeSwitcher />
      </div>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Logo className={styles.logoSvg} />
        </div>

        <h1 className={styles.title}>Dremuli</h1>
        <div className={styles.caption}>{welcomePage.trackBabysSleep}</div>
        <div className={styles.description}>
          {welcomePage.monitorBabysSleep}
        </div>
        <div></div>
        <div className={styles.buttons}>
          <Button route={{ key: "login" }} style="outline">
            {welcomePage.signIn}
          </Button>
          <Button route={{ key: "register" }} style="action">
            {welcomePage.signUp}
          </Button>
        </div>
      </div>
    </div>
  );
}
