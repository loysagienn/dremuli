import React from "react";
import styles from "./settings-page.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "selectors";
import { Layout } from "components/layout";
import { ThemeSwitcher } from "components/theme-switcher";

export function SettingsPage() {
  const user = useSelector(selectUser);

  return (
    <Layout>
      <div className={styles.content}>
        <div className={styles.page}>
          <div className={styles.title}>Settings</div>
          <ThemeSwitcher />
        </div>
      </div>
    </Layout>
  );
}
