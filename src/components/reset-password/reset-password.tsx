import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "actions";
import { Link } from "components/router";
import { selectRoute } from "selectors";
import styles from "./reset-password.module.css";
import { Header } from "components/header";
import { FormInput, FormSubmit } from "components/form";

export function ResetPassword() {
  const route = useSelector(selectRoute);
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const token = route.key === "reset_password" ? route.token : null;

  const onSubmit = useCallback(() => {
    if (!newPassword || !token) {
      return;
    }

    dispatch(resetPassword(newPassword, token));
  }, [newPassword, token]);

  if (!token) {
    return (
      <div className={styles.root}>
        <Header />
        <div className={styles.content}>
          <div className={styles.page}>Token is invalid or expired</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.content}>
        <div className={styles.page}>
          <div className={styles.title}>Reset password</div>

          <FormInput
            label="New password"
            value={newPassword}
            onChange={setNewPassword}
            type="password"
            autoFocus
          />
          <FormSubmit onSubmit={onSubmit} submitLabel="Submit" />
        </div>
      </div>
    </div>
  );
}
