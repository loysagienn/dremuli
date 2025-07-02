import React, { useCallback } from "react";
import { cn } from "utils/cn";
import styles from "./theme-switcher.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "selectors";
import { setTheme } from "actions";

export function ThemeSwitcher() {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();

  const toggleTheme = useCallback(
    () => dispatch(setTheme(theme === "light" ? "dark" : "light")),
    [theme]
  );

  return (
    <div className={cn(styles.root)}>
      {`Current theme: ${theme}`}{" "}
      <div className={styles.toggle} onClick={toggleTheme}>
        Toggle
      </div>
    </div>
  );
}
