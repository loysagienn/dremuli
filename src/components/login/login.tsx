import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "actions";
import { Link } from "components/router";
import { Header } from "components/header";
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
        <div>Login</div>
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
        <div>
          <Link route={{ key: "forget_password" }}>Forget password</Link>
        </div>
      </div>
    </div>
  );
}
