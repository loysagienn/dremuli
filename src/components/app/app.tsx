import React from "react";
import { cn } from "utils/cn";
import styles from "./app.module.css";
import light from "./light.module.css";
import dark from "./dark.module.css";
import { useSelector } from "react-redux";
import { selectTheme, selectUser } from "selectors";
import { ThemeSwitcher } from "components/theme-switcher";
import { Route, Link } from "components/router";
import { Registration } from "components/registration";
import { ChangePassword } from "components/change-password";
import { ForgetPassword } from "components/forget-password";
import { ResetPassword } from "components/reset-password";
import { Login } from "components/login";

export function App() {
  const theme = useSelector(selectTheme);
  const user = useSelector(selectUser);

  return (
    <div
      className={cn(
        styles.app,
        theme === "light" && light.root,
        theme === "dark" && dark.root
      )}
    >
      <Route routeKey="home">
        <div>Template app</div>
        {user && (
          <div>
            <Link route={{ key: "profile" }}>Profile</Link>
          </div>
        )}
        {!user && (
          <>
            <div>
              <Link route={{ key: "login" }}>Login</Link>
            </div>
            <div>
              <Link route={{ key: "register" }}>Register</Link>
            </div>
          </>
        )}
        <div>
          <Link route={{ key: "settings" }}>Settings</Link>
        </div>
      </Route>

      <Route routeKey="settings">
        <Link route={{ key: "home" }}>Home</Link>
        <ThemeSwitcher />
      </Route>

      <Route routeKey="login">
        <Link route={{ key: "home" }}>Home</Link>

        {user ? <div>{`Logged in as: ${user.email}`}</div> : <Login />}
      </Route>

      <Route routeKey="register">
        <Link route={{ key: "home" }}>Home</Link>
        {user ? <div>{`Logged in as: ${user.email}`}</div> : <Registration />}
      </Route>

      <Route routeKey="profile">
        <div>
          <Link route={{ key: "home" }}>Home</Link>
        </div>
        <div>
          <Link route={{ key: "profile_password" }}>Change password</Link>
        </div>
        <div>
          <Link route={{ key: "logout" }} web>
            Logout
          </Link>
        </div>
      </Route>
      <Route routeKey="profile_password">
        <div>
          <Link route={{ key: "home" }}>Home</Link>
        </div>
        {user && <ChangePassword />}
      </Route>

      <Route routeKey="forget_password">
        <Link route={{ key: "home" }}>Home</Link>

        <ForgetPassword />
      </Route>

      <Route routeKey="reset_password">
        <Link route={{ key: "home" }}>Home</Link>

        <ResetPassword />
      </Route>
    </div>
  );
}
