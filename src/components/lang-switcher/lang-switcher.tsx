import React, { useCallback } from "react";
import { Select } from "components/select";
import { Lang, Option } from "types";
import { useDispatch, useSelector } from "react-redux";
import { selectLanguage } from "selectors";
import { setLanguage } from "actions";
import styles from "./lang-switcher.module.css";
import { cn } from "utils/cn";
import { PopupPosition } from "components/popup";

const langOptions: Option[] = [
  { value: "en", label: "EN" },
  { value: "ru", label: "RU" },
];

type LangSwitcherProps = {
  className?: string;
  popupPosition?: PopupPosition;
};

export function LangSwitcher({ className, popupPosition }: LangSwitcherProps) {
  const lang = useSelector(selectLanguage);
  const dispatch = useDispatch();

  const onChange = useCallback((value: string) => {
    dispatch(setLanguage(value as Lang));
  }, []);

  return (
    <Select
      className={cn(className, styles.switcher)}
      value={lang}
      options={langOptions}
      onChange={onChange}
      popupPosition={popupPosition}
    />
  );
}
