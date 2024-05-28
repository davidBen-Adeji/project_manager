import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext.js";
import { useLogout } from "../../hooks/useLogout.js";

import ArrowDown from "../../assets/svg/icon-arrow-down.svg";

import classes from "./UserDropdown.module.css";

export default function UserDropdown() {
  const [display, setDisplay] = useState(false);
  const { user } = useAuthContext();
  const logoutUser = useLogout();

  function handleDisplay() {
    setDisplay((prevState) => !prevState);
  }

  function handleClick() {
    logoutUser();
  }

  return (
    <div className={`${classes.userDropdown} user`}>
      <button
        className={`${classes.userButton} user-btn`}
        onClick={handleDisplay}
      >
        <p>{user.email[0].toUpperCase()}</p>{" "}
        <img src={ArrowDown} alt="down arrow" />{" "}
      </button>
      <div
        className={`${classes.userDetails} ${display ? "d-block" : "d-none"}`}
      >
        <p>{user.email}</p>
        <button
          className={`${classes.logoutBtn} user-btn`}
          onClick={handleClick}
        >
          logout
        </button>
      </div>
    </div>
  );
}
