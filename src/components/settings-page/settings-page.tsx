import React from "react";
import styles from "./settings-page.module.css";
import { useSelector } from "react-redux";
import { Link } from "components/router";
import { selectLanguage } from "selectors";
import { Layout } from "components/layout";
import { ThemeSwitcher } from "components/theme-switcher";
import { useText } from "lang/context";
import { cn } from "utils/cn";

export function SettingsPage() {
  const { settingsPage: text } = useText();
  const lang = useSelector(selectLanguage);

  return (
    <Layout>
      <div className={styles.content}>
        <div className={styles.page}>
          <div className={styles.title}>{text.title}</div>
          <div className={cn(styles.line, styles.prop)}>
            <div>{text.theme}:</div>
            <ThemeSwitcher />
          </div>
          <div className={styles.line}>
            <Link route={{ key: "terms_of_use", lang }}>{text.termsOfUse}</Link>
          </div>
          <div className={styles.line}>
            <Link route={{ key: "privacy_policy", lang }}>
              {text.privacyPolicy}
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
