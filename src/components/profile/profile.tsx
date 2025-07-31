import React from "react";
import styles from "./profile.module.css";
import { Link } from "components/router";
import { useSelector } from "react-redux";
import { selectUser } from "selectors";
import { Layout } from "components/layout";
import { LangSwitcher } from "components/lang-switcher";
import { cn } from "utils/cn";
import { useText } from "lang/context";

export function Profile() {
  const { profilePage: text } = useText();
  const user = useSelector(selectUser);

  return (
    <Layout>
      <div className={styles.content}>
        <div className={styles.page}>
          <div className={styles.title}>{text.title}</div>

          <div className={styles.line}>{user?.email}</div>

          <div className={cn(styles.line, styles.prop)}>
            <div>{text.language}:</div>
            <LangSwitcher />
          </div>
          <div className={styles.line}>
            <Link route={{ key: "profile_password" }}>
              {text.changePassword}
            </Link>
          </div>
          <div className={styles.line}>
            <Link route={{ key: "logout" }} web>
              {text.logout}
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
