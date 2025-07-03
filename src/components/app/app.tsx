import React from "react";
import { cn } from "utils/cn";
import styles from "./app.module.css";
import lightStyles from "app/styles/light.module.css";
import darkStyles from "app/styles/dark.module.css";
import commonStyles from "app/styles/common.module.css";
import { useSelector } from "react-redux";
import { selectTheme, selectUser } from "selectors";
import { Route, Link } from "components/router";
import { Registration } from "components/registration";
import { ChangePassword } from "components/change-password";
import { ForgetPassword } from "components/forget-password";
import { ResetPassword } from "components/reset-password";
import { WelcomePage } from "components/welcome-page";
import { Profile } from "components/profile";
import { Home } from "components/home";
import { Login } from "components/login";

export function App() {
  const theme = useSelector(selectTheme);
  const user = useSelector(selectUser);

  return (
    <div
      className={cn(
        styles.app,
        commonStyles.root,
        theme === "light" && lightStyles.root,
        theme === "dark" && darkStyles.root
      )}
    >
      <Route routeKey="home">
        {user && <Home />}
        {!user && <WelcomePage />}
      </Route>

      <Route routeKey="login">
        <Login />
      </Route>

      <Route routeKey="register">
        <Registration />
      </Route>

      <Route routeKey="profile">{user && <Profile />}</Route>

      <Route routeKey="profile_password">{user && <ChangePassword />}</Route>

      <Route routeKey="forget_password">
        <ForgetPassword />
      </Route>

      <Route routeKey="reset_password">
        <ResetPassword />
      </Route>
    </div>
  );
}
