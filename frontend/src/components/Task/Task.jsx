import { useAuthContext } from "../../hooks/useAuthContext";
import { useHandleTaskCheckedState } from "../../hooks/useHandleTaskCheckedState";
import { useDeleteTask } from "../../hooks/useDeleteTask";

import { Link } from "react-router-dom";

import classes from "./Task.module.css";

import GreenBinImg from "../../assets/svg/bin-green.svg";
import OrangeBinImg from "../../assets/svg/bin-orange.svg";
import BlueBinImg from "../../assets/svg/bin-blue.svg";
import RedBinImg from "../../assets/svg/bin-red.svg";

export default function Task({ _id, index, title, isChecked }) {
  const { isLoading: checkedStatePending, handleCheckedState } =
    useHandleTaskCheckedState();
  const onDeleteTask = useDeleteTask();
  const { user } = useAuthContext();

  let path = `/${_id}`;
  if (isChecked || checkedStatePending) path = "";

  let binImg = GreenBinImg;

  switch (user.themePreference) {
    case "blue":
      binImg = BlueBinImg;
      break;

    case "orange":
      binImg = OrangeBinImg;
      break;

    case "red":
      binImg = RedBinImg;
      break;
  }

  return (
    <li className={`list shadow-lg rounded-full`}>
      <div className={`itemGroup`}>
        <input
          className={`checkbox-0`}
          type="checkbox"
          id={_id}
          checked={isChecked}
          onChange={() => handleCheckedState(_id, index, isChecked)}
        />
        <label htmlFor={_id} className={`checkbox customCheckbox rounded-full`}>
          <span className={`${isChecked ? "span" : ""} customSpan`}></span>
        </label>
        <Link
          to={path}
          className={`${classes.link} ${
            isChecked ? classes.taskTitleLinkClicked : ""
          } text`}
        >
          {title}
        </Link>
      </div>
      <button
        className="delete-btn"
        type="submit"
        onClick={() => onDeleteTask(_id)}
      >
        <img className={classes.deleteTaskButton} src={binImg} alt="bin" />
      </button>
    </li>
  );
}
