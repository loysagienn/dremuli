import React, { useCallback } from "react";
import { cn } from "utils/cn";
import styles from "./theme-switcher.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "selectors";
import { setTheme } from "actions";
import Moon from "./moon.svg";
import Sun from "./sun.svg";

type ThemeSwitcherProps = {
  className?: string;
};

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();

  const toggleTheme = useCallback(
    () => dispatch(setTheme(theme === "light" ? "dark" : "light")),
    [theme]
  );

  return (
    <div className={cn(className, styles.switcher)} onClick={toggleTheme}>
      <div
        className={cn(styles.control, theme === "dark" && styles.checked)}
      ></div>
      <Moon className={styles.moon} />
      <Sun className={styles.sun} />
    </div>
  );
}
