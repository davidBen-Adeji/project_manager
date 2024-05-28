import { useNewTaskContext } from "../../hooks/useNewTaskContext";

import classes from "./NewTaskTitle.module.css";

export default function NewTaskTitle({ isTitleEmpty }) {
  const { title, editTitle } = useNewTaskContext();

  function handleTitleChange(e) {
    const title = e.target.value;
    editTitle(title);
  }

  return (
    <>
      <div
        className={`${classes.projectTitleInput} ${
          isTitleEmpty ? "shaking-element" : ""
        }`}
      >
        <input
          className={`${classes.projectTitleInputText} 
        taskTitleInputBorder shadow-md rounded-full`}
          type="text"
          value={title}
          placeholder="Add Project Title Here"
          onChange={handleTitleChange}
        />
      </div>
    </>
  );
}
