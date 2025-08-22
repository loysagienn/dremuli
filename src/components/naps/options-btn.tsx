import React, { useCallback, useRef, useState } from "react";
import styles from "./naps.module.css";
import { Button } from "components/button";
import OptionsSvg from "svg/options.svg";
import { Popup } from "components/popup";
import { useText } from "lang/context";
import { useDispatch } from "react-redux";
import { showExportToJsonAction, showImportFromJsonAction } from "actions";

export function OptionsBtn() {
  const buttonRef = useRef<HTMLElement>(null);
  const [focused, setFocused] = useState(false);
  const focus = useCallback(() => setFocused(true), []);
  const blur = useCallback(() => setFocused(false), []);
  const { timelinePage: text } = useText();
  const dispatch = useDispatch();

  const importFromJson = useCallback(() => {
    dispatch(showImportFromJsonAction());
  }, []);

  const exportToJson = useCallback(() => {
    dispatch(showExportToJsonAction());
  }, []);

  const onClick = useCallback(() => {
    if (focused) {
      blur();
    }
  }, [focused]);

  return (
    <>
      <Button
        className={styles.optionsBtn}
        innerRef={buttonRef}
        focused={focused}
        onFocus={focus}
        onBlur={blur}
        onClick={onClick}
      >
        <OptionsSvg className={styles.optionsButtonSvg} />
      </Button>
      <Popup
        targetRef={buttonRef}
        className={styles.optionsPopup}
        position="top-right"
        offset={6}
      >
        {focused && (
          <>
            <div className={styles.menuItem} onClick={importFromJson}>
              {text.importFromJson}
            </div>
            <div className={styles.menuItem} onClick={exportToJson}>
              {text.exportToJson}
            </div>
          </>
        )}
      </Popup>
    </>
  );
}
