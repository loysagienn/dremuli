import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "actions";
import { Header } from "components/header";
import { Link } from "components/router";
import { FormInput, FormSubmit } from "components/form";
import { CheckboxText } from "components/checkbox";
import styles from "./registration.module.css";
import { useText } from "lang/context";
import { selectLanguage } from "selectors";

export function Registration() {
  const { registrationPage } = useText();
  const lang = useSelector(selectLanguage);
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
          <div className={styles.title}>{registrationPage.title}</div>
          <FormInput
            label={registrationPage.email}
            value={email}
            onChange={setEmail}
            autoFocus
            type="email"
          />
          <FormInput
            label={registrationPage.password}
            value={password}
            onChange={setPassword}
            type="password"
          />
          <CheckboxText
            value={termsOfUseConfirmed}
            onChange={confirmTermsOfUse}
            className={styles.termsOfUse}
          >
            {registrationPage.agreement(
              <Link route={{ key: "privacy_policy", lang }}>
                {registrationPage.privacyPolicy}
              </Link>,
              <Link route={{ key: "terms_of_use", lang }}>
                {registrationPage.termsOfUse}
              </Link>
            )}
          </CheckboxText>
          <FormSubmit
            onSubmit={onSubmit}
            submitLabel={registrationPage.submit}
          />
        </div>
      </div>
    </div>
  );
}
