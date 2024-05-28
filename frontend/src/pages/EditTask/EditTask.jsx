import { useState } from "react";

import { useEditTaskContext } from "../../hooks/useEditTaskContext";

import { Link } from "react-router-dom";

import DoneImg from "../../assets/svg/done.svg";

import classes from "./EditTask.module.css";

import EditTaskTitle from "../../components/EditTaskTitle/EditTaskTitle";
import EditSubTask from "../../components/EditSubTask/EditSubTask";
import EditSubTaskForm from "../../components/EditSubTaskForm/EditSubTaskForm";

export default function EditTask() {
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const { title, subTasks } = useEditTaskContext();
  
  function handleSubmit() {
    if (!title) {
      setIsTitleEmpty(true);
      setTimeout(() => {
        setIsTitleEmpty(false);
      }, 300);
    }
  }

  return (
    <>
      <EditTaskTitle isTitleEmpty={isTitleEmpty} />
      {subTasks.length > 0 &&
        subTasks.map((subTask, index) => (
          <EditSubTask
            key={subTask._id}
            _id={subTask._id}
            index={index}
            title={subTask.title}
            isChecked={subTask.isChecked}
          />
        ))}
      <EditSubTaskForm />
      <Link
        className={`${classes.doneBtn} btn rounded-full`}
        to={`${title ? "/" : ""}`}
        onClick={handleSubmit}
      >
        <img className={classes.doneImg} src={DoneImg} alt="done" />
      </Link>
    </>
  );
}
