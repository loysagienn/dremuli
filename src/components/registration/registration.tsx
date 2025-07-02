import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "actions";
import { Header } from "components/header";
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
        <div>Registration</div>
        <div>Email:</div>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <div>Password:</div>
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
        />
        <div>
          <button onClick={onSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}
