import { useEditTaskContext } from "../../hooks/useEditTaskContext";
import { useUpdateTitle } from "../../hooks/useUpdateTitle";

import classes from "./EditTaskTitle.module.css";

export default function EditTaskTitle({ isTitleEmpty }) {
  const { _id, index, title, editTitle } = useEditTaskContext();
  const updateTitle = useUpdateTitle();

  async function handleTitleChange(e) {
    const title = e.target.value;
    editTitle(title);

    if (!title.trim()) return;

    await updateTitle(_id, index, title);
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
