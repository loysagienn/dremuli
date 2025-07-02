import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { changePassword } from "actions";

export function ChangePassword() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    if (!newPassword || !password) {
      return;
    }

    dispatch(changePassword(password, newPassword));
  }, [newPassword, password]);

  return (
    <div>
      <div>Change password</div>
      <div>Current password:</div>
      <input
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        type="password"
      />
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
