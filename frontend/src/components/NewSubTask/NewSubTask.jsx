import { useAuthContext } from "../../hooks/useAuthContext";
import { useNewTaskContext } from "../../hooks/useNewTaskContext";

import GreenBinImg from "../../assets/svg/bin-green.svg";
import OrangeBinImg from "../../assets/svg/bin-orange.svg";
import BlueBinImg from "../../assets/svg/bin-blue.svg";
import RedBinImg from "../../assets/svg/bin-red.svg";

import classes from "./NewSubTask.module.css";

export default function NewSubTask({ index, title, isChecked }) {
  const { user } = useAuthContext();
  const { subTasks, editSubTasks } = useNewTaskContext();

  const inputId = `${Math.random()}_${Math.random()}`;

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

  function handleInputChange() {
    const newSubTasks = subTasks.toSpliced(index, 1, {
      title,
      isChecked: !isChecked,
    });
    editSubTasks(newSubTasks);
  }

  function onDeleteSubTask() {
    const newSubTasks = subTasks.toSpliced(index, 1);
    editSubTasks(newSubTasks);
  }

  return (
    <li className={`list shadow-lg rounded-full`}>
      <div className={`itemGroup`}>
        <input
          className={`checkbox-0`}
          type="checkbox"
          id={inputId}
          checked={isChecked}
          onChange={handleInputChange}
        />
        <label
          htmlFor={inputId}
          className={`checkbox customCheckbox rounded-full`}
        >
          <span className={`${isChecked ? "span" : ""} customSpan`}></span>
        </label>
        <label
          htmlFor={inputId}
          className={`${classes.title} ${
            isChecked ? classes.titleClicked : ""
          } text`}
        >
          {title}
        </label>
      </div>
      <button className="delete-btn" type="submit" onClick={onDeleteSubTask}>
        <img className={classes.deleteTaskButton} src={binImg} alt="bin" />
      </button>
    </li>
  );
}
