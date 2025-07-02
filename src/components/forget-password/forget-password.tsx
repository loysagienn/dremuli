import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { forgetPassword } from "actions";
import { Link } from "components/router";
import { Header } from "components/header";
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
        <div>Forget password</div>
        {done && <div>Reset password link has been sent to your email</div>}
        {!done && (
          <>
            <div>Email:</div>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <div>
              <button onClick={onSubmit}>Submit</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
