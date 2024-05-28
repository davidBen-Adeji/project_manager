import { useAuthContext } from "../../hooks/useAuthContext";

import classes from "./Main.module.css";

export default function Main({ children }) {
  const { user } = useAuthContext();

  return <main className={`${user ? user.themePreference : "green"} bg ${classes.main}`}>{children}</main>;
}
