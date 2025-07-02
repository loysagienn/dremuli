import React from "react";
import { Button } from "components/button";
import { ThemeSwitcher } from "components/theme-switcher";
import Logo from "svg/logo.svg";
import Home from "svg/home.svg";
import { Link } from "components/router";
import styles from "./header.module.css";
import { useSelector } from "react-redux";
import { selectRoute } from "selectors";
import { AppRoute } from "app/router";
import { cn } from "utils/cn";

const routeNames: { [key in AppRoute["key"]]?: string } = {};

export function Header() {
  const route = useSelector(selectRoute);

  const routeName = routeNames[route?.key];

  return (
    <div className={cn(styles.root, route.key === "home" && styles.home)}>
      {route.key !== "home" && (
        <Link route={{ key: "home" }} className={styles.homeLink}>
          <Home className={styles.homeSvg} />
        </Link>
      )}
      {routeName && <div className={styles.routeName}>{routeName}</div>}
      <ThemeSwitcher />
    </div>
  );
}
