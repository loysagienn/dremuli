import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "actions";
import { Header } from "components/header";
import { Link } from "components/router";
import { FormInput, FormSubmit } from "components/form";
import { CheckboxText } from "components/checkbox";
import styles from "./registration.module.css";

export function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsOfUseConfirmed, confirmTermsOfUse] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    if (!email || !password || !termsOfUseConfirmed) {
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
          <CheckboxText
            value={termsOfUseConfirmed}
            onChange={confirmTermsOfUse}
            className={styles.termsOfUse}
          >
            I agree to the{" "}
            <Link route={{ key: "privacy_policy" }}>Privacy Policy</Link>{" "}
            and&nbsp;
            <Link route={{ key: "terms_of_use" }}>Terms of Use</Link>
          </CheckboxText>
          <FormSubmit onSubmit={onSubmit} submitLabel="Sign up" />
        </div>
      </div>
    </div>
  );
}
