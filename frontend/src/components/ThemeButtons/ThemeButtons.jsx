import { useChangeTheme } from "../../hooks/useChangeTheme";

import classes from "./ThemeButtons.module.css";

export default function ThemeButtons() {
  const { themePreference, onChangeTheme } = useChangeTheme();

  return (
    <div className={classes.buttons}>
      <button
        className={`${classes.btn} ${classes.btnGreen} ${
          themePreference === "green" ? classes.active : ""
        }`}
        onClick={() => onChangeTheme("green")}
      ></button>
      <button
        className={`${classes.btn} ${classes.btnBlue} ${
          themePreference === "blue" ? classes.active : ""
        }`}
        onClick={() => onChangeTheme("blue")}
      ></button>
      <button
        className={`${classes.btn} ${classes.btnOrange} ${
          themePreference === "orange" ? classes.active : ""
        }`}
        onClick={() => onChangeTheme("orange")}
      ></button>
      <button
        className={`${classes.btn} ${classes.btnRed} ${
          themePreference === "red" ? classes.active : ""
        }`}
        onClick={() => onChangeTheme("red")}
      ></button>
    </div>
  );
}
