import { useState } from "react";

import { useNewTaskContext } from "../../hooks/useNewTaskContext";

import AddImg from "../../assets/svg/add.svg";

import classes from "./NewSubTaskForm.module.css";

export default function NewSubTaskForm() {
  const [text, setText] = useState("");
  const [isInputFieldEmpty, setIsInputFieldEmpty] = useState(false);
  const { subTasks, editSubTasks } = useNewTaskContext();

  function handleSubmit(e) {
    e.preventDefault();
    const title = text.trim();

    if (!title) {
      setIsInputFieldEmpty(true);
      setTimeout(() => {
        setIsInputFieldEmpty(false);
      }, 300);
      return;
    }

    const newSubTasks = [...subTasks, { title, isChecked: false }];
    editSubTasks(newSubTasks);
    setText("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`${classes.form} ${
        isInputFieldEmpty ? "shaking-element" : ""
      }  shadow-lg rounded-full`}
    >
      <div className={classes.inputGroup}>
        <input
          className={`${classes.inputGroupText} text rounded-full`}
          type="text"
          placeholder="Add items here"
          value={text}
          onChange={(e) => setText(e.target.value)}
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
