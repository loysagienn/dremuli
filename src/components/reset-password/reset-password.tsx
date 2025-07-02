import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "actions";
import { Link } from "components/router";
import { selectRoute } from "selectors";

export function ResetPassword() {
  const route = useSelector(selectRoute);
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const token = route.key === "reset_password" ? route.token : null;

  const onSubmit = useCallback(() => {
    if (!newPassword || !token) {
      return;
    }

    dispatch(resetPassword(newPassword, token));
  }, [newPassword, token]);

  if (!token) {
    return <div>Token is invalid or expired</div>;
  }

  return (
    <div>
      <div>Reset password</div>
      <div>New password:</div>
      <input
        value={newPassword}
        onChange={(event) => setNewPassword(event.target.value)}
        type="password"
      />
      <div>
        <button onClick={onSubmit}>Submit</button>
      </div>
    </div>
  );
}
