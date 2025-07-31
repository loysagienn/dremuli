import React from "react";
import styles from "./profile.module.css";
import { Link } from "components/router";
import { useSelector } from "react-redux";
import { selectLanguage, selectUser } from "selectors";
import { Layout } from "components/layout";
import { LangSwitcher } from "components/lang-switcher";

export function Profile() {
  const user = useSelector(selectUser);
  const lang = useSelector(selectLanguage);

  return (
    <Layout>
      <div className={styles.content}>
        <div className={styles.page}>
          <div className={styles.title}>Profile</div>

          <div className={styles.line}>
            <LangSwitcher />
          </div>
          <div className={styles.line}>{user?.email}</div>
          <div className={styles.line}>
            <Link route={{ key: "profile_password" }}>Change password</Link>
          </div>
          <div className={styles.line}>
            <Link route={{ key: "terms_of_use", lang }}>Terms of Use</Link>
          </div>
          <div className={styles.line}>
            <Link route={{ key: "privacy_policy", lang }}>Privacy Policy</Link>
          </div>
          <div className={styles.line}>
            <Link route={{ key: "logout" }} web>
              Logout
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
