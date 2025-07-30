import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { forgetPassword } from "actions";
import { Header } from "components/header";
import { FormInput, FormSubmit } from "components/form";
import styles from "./forget-password.module.css";
import { useText } from "lang/context";

export function ForgetPassword() {
  const { restorePasswordPage } = useText();
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
          <div className={styles.title}>
            {restorePasswordPage.restorePassword}
          </div>
          {done && <div>{restorePasswordPage.successMessage}</div>}
          {!done && (
            <>
              <FormInput
                label={restorePasswordPage.email}
                value={email}
                onChange={setEmail}
                type="email"
                autoFocus
              />
              <FormSubmit
                onSubmit={onSubmit}
                submitLabel={restorePasswordPage.submit}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
