import { useEditTaskContext } from "../../hooks/useEditTaskContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useHandleSubTaskCheckedState } from "../../hooks/useHandleSubTaskCheckedState";
import { useDeleteSubTask } from "../../hooks/useDeleteSubTask";

import GreenBinImg from "../../assets/svg/bin-green.svg";
import OrangeBinImg from "../../assets/svg/bin-orange.svg";
import BlueBinImg from "../../assets/svg/bin-blue.svg";
import RedBinImg from "../../assets/svg/bin-red.svg";

import classes from "./EditSubTask.module.css";

export default function EditSubTask({ _id, index, title, isChecked }) {
  const { _id: task_id, index: taskIndex } = useEditTaskContext();
  const { user } = useAuthContext();
  const handleCheckedState = useHandleSubTaskCheckedState();
  const onDeleteSubTask = useDeleteSubTask();

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
          onChange={() =>
            handleCheckedState(_id, task_id, index, taskIndex, isChecked)
          }
        />
        <label
          htmlFor={_id}
          className={`checkbox customCheckbox rounded-full`}
        >
          <span className={`${isChecked ? "span" : ""} customSpan`}></span>
        </label>
        <label
          htmlFor={_id}
          className={`${classes.title} ${
            isChecked ? classes.titleClicked : ""
          } text`}
        >
          {title}
        </label>
      </div>
      <button
        className="delete-btn"
        type="submit"
        onClick={() => onDeleteSubTask(_id, task_id, index, taskIndex)}
      >
        <img className={classes.deleteTaskButton} src={binImg} alt="bin" />
      </button>
    </li>
  );
}
