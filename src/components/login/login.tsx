import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "actions";
import { Link } from "components/router";
import { Header } from "components/header";
import { FormInput, FormSubmit } from "components/form";
import styles from "./login.module.css";
import { useText } from "lang/context";

export function Login() {
  const { loginPage } = useText();
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
          <div className={styles.title}>{loginPage.title}</div>
          <FormInput
            label={loginPage.email}
            value={email}
            type="email"
            onChange={setEmail}
            autoFocus
          />
          <FormInput
            label={loginPage.password}
            value={password}
            onChange={setPassword}
            type="password"
          />
          <FormSubmit onSubmit={onSubmit} submitLabel={loginPage.submit} />
          <div className={styles.forgetPassword}>
            <Link
              route={{ key: "forget_password" }}
              className={styles.forgetPasswordLink}
            >
              {loginPage.forgetPassword}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
