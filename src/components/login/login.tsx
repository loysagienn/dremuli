import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "actions";
import { Link } from "components/router";
import { Header } from "components/header";
import { FormInput, FormSubmit } from "components/form";
import styles from "./login.module.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    if (!email || !password) {
      return;
    }

    dispatch(loginUser(email, password));
  }, [email, password]);

  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.content}>
        <div className={styles.page}>
          <div className={styles.title}>Sign in</div>
          <FormInput
            label="Email"
            value={email}
            type="email"
            onChange={setEmail}
            autoFocus
          />
          <FormInput
            label="Password"
            value={password}
            onChange={setPassword}
            type="password"
          />
          <FormSubmit onSubmit={onSubmit} submitLabel="Sign in" />
          <div className={styles.forgetPassword}>
            <Link
              route={{ key: "forget_password" }}
              className={styles.forgetPasswordLink}
            >
              Forget password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
