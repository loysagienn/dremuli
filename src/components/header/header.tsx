import React from "react";
import { Button } from "components/button";
import { ThemeSwitcher } from "components/theme-switcher";
import Logo from "svg/logo.svg";
import Home from "svg/home.svg";
import { Link } from "components/router";
import styles from "./header.module.css";
import { useSelector } from "react-redux";
import { selectRoute } from "selectors";

export function Header() {
  const route = useSelector(selectRoute);

  return (
    <div className={styles.root}>
      {route.key !== "home" && (
        <Link route={{ key: "home" }} className={styles.homeLink}>
          <Home className={styles.homeSvg} />
        </Link>
      )}
      <ThemeSwitcher />
    </div>
  );
}
