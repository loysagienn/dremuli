import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { forgetPassword } from "actions";
import { Header } from "components/header";
import { FormInput, FormSubmit } from "components/form";
import styles from "./forget-password.module.css";

export function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    if (!email) {
      return;
    }

    dispatch(forgetPassword(email));
    setDone(true);
  }, [email]);

  return (
    <div className={styles.root}>
      <Header />

      <div className={styles.content}>
        <div className={styles.page}>
          <div className={styles.title}>Restore password</div>
          {done && <div>Reset password link has been sent to your email</div>}
          {!done && (
            <>
              <FormInput
                label="Email"
                value={email}
                onChange={setEmail}
                autoFocus
              />
              <FormSubmit onSubmit={onSubmit} submitLabel="Submit" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
