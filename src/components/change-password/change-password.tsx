import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { changePassword } from "actions";
import { FormInput, FormSubmit } from "components/form";
import styles from "./change-password.module.css";
import { Header } from "components/header";
import { Layout } from "components/layout";
import { useText } from "lang/context";

export function ChangePassword() {
  const { changePasswordPage: text } = useText();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    if (!newPassword || !password) {
      return;
    }

    dispatch(changePassword(password, newPassword));
  }, [newPassword, password]);

  return (
    <Layout>
      <div className={styles.content}>
        <div className={styles.page}>
          <div className={styles.title}>{text.title}</div>

          <FormInput
            label={text.currentPassword}
            value={password}
            onChange={setPassword}
            type="password"
            autoFocus
          />
          <FormInput
            label={text.newPassword}
            value={newPassword}
            onChange={setNewPassword}
            type="password"
          />
          <FormSubmit onSubmit={onSubmit} submitLabel={text.submit} />
        </div>
      </div>
    </Layout>
  );
}
