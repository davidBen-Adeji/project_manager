import { useTasksContext } from "../../hooks/useTasksContext.js";
import { useBinContext } from "../../hooks/useBinContext.js";
import { useAuthContext } from "../../hooks/useAuthContext.js";

import TaskImg from "../../assets/svg/task-white.svg";
import BinImg from "../../assets/svg/bin-white.svg";

import classes from "./Navbar.module.css";

import CustomLink from "../CustomLink/CustomLink.jsx";
import ThemeButtons from "../ThemeButtons/ThemeButtons.jsx";
import UserDropdown from "../UserDropdown/UserDropdown.jsx";

export default function Navbar() {
  const { tasks } = useTasksContext();
  const { bin } = useBinContext();
  const { user } = useAuthContext();

  const tasksLength = tasks && tasks.length > 0;
  const binLength = bin && bin.length > 0;

  return (
    <nav
      className={`${user ? user.themePreference : "green"} ${
        classes.header
      } headerBg`}
    >
      {user && (
        <>
          <UserDropdown />
          <ThemeButtons />
        </>
      )}
      <div className={classes.nav}>
        {user && (
          <>
            <CustomLink to="/">
              <img className={classes.taskImg} src={TaskImg} alt="tasks" />
              <p className="text-white mb-0.64">Tasks</p>
              <p
                className={`${classes.headerLengths} length ${
                  tasksLength ? "opacity-100" : "opacity-0"
                }`}
              >
                {tasks && tasks.length}
              </p>
            </CustomLink>
            <CustomLink to="/bin">
              <img
                className={`${classes.binImg} ${classes.mt}`}
                src={BinImg}
                alt="bin"
              />
              <p className={`text-white ${classes.mt2}`}>Bin</p>
              <p
                className={`${classes.headerLengths} ${classes.mt3} length ${
                 binLength ? "opacity-100" : "opacity-0"
                }`}
              >
                {bin && bin.length}
              </p>
            </CustomLink>
          </>
        )}
        {!user && (
          <>
            <CustomLink to="/login">
              <p className="text-white ml-2">Login</p>
            </CustomLink>
            <CustomLink to="/signup">
              <p className="text-white ml-2">Signup</p>
            </CustomLink>
          </>
        )}
      </div>
    </nav>
  );
}
