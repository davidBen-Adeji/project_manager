import { useEditTaskContext } from "../../hooks/useEditTaskContext";
import { useAddSubTask } from "../../hooks/useAddSubTask";

import AddImg from "../../assets/svg/add.svg";

import classes from "./EditSubTaskForm.module.css";

export default function EditSubTaskForm() {
  const { _id, index } = useEditTaskContext();
  const { isInputFieldEmpty, title, setTitle, addSubTask } = useAddSubTask();

  return (
    <form
      onSubmit={(e) => addSubTask(e, _id, index, title.trim())}
      className={`${classes.form} ${
        isInputFieldEmpty ? "shaking-element" : ""
      }  shadow-lg rounded-full`}
    >
      <div className={classes.inputGroup}>
        <input
          className={`${classes.inputGroupText} text rounded-full`}
          type="text"
          placeholder="Add items here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className={`${classes.inputGroupBtn} btn rounded-full`}
          type="submit"
        >
          <img src={AddImg} className={classes.inputGroupImg} alt="add item" />
        </button>
      </div>
    </form>
  );
}
