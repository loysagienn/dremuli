import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { changePassword } from "actions";
import { FormInput, FormSubmit } from "components/form";
import styles from "./change-password.module.css";
import { Header } from "components/header";

export function ChangePassword() {
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
    <div className={styles.root}>
      <Header />
      <div className={styles.content}>
        <div className={styles.page}>
          <div className={styles.title}>Change password</div>

          <FormInput
            label="Current password"
            value={password}
            onChange={setPassword}
            type="password"
            autoFocus
          />
          <FormInput
            label="New password"
            value={newPassword}
            onChange={setNewPassword}
            type="password"
          />
          <FormSubmit onSubmit={onSubmit} submitLabel="Change password" />
        </div>
      </div>
    </div>
  );
}
