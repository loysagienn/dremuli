import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "actions";
import { Header } from "components/header";
import { FormInput, FormSubmit } from "components/form";
import styles from "./registration.module.css";

export function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    if (!email || !password) {
      return;
    }

    dispatch(registerUser(email, password));
  }, [email, password]);

  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.content}>
        <div className={styles.page}>
          <div className={styles.title}>Sign up</div>
          <FormInput
            label="Email"
            value={email}
            onChange={setEmail}
            autoFocus
            type="email"
          />
          <FormInput
            label="Password"
            value={password}
            onChange={setPassword}
            type="password"
          />
          <FormSubmit onSubmit={onSubmit} submitLabel="Sign up" />
        </div>
      </div>
    </div>
  );
}
