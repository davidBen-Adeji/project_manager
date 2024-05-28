import { useNewTaskContext } from "../../hooks/useNewTaskContext";
import { useAddNewTask } from "../../hooks/useAddNewTask";

import { Link } from "react-router-dom";

import classes from "./NewTask.module.css";

import CancelImg from "../../assets/svg/cancel.svg";
import DoneImg from "../../assets/svg/done.svg";

import NewTaskTitle from "../../components/NewTaskTitle/NewTaskTitle";
import NewSubTask from "../../components/NewSubTask/NewSubTask";
import NewSubTaskForm from "../../components/NewSubTaskForm/NewSubTaskForm";

export default function NewTask() {
  const { title, subTasks } = useNewTaskContext();
  const { isTitleEmpty, onAddTask } = useAddNewTask();

  return (
    <>
      <NewTaskTitle isTitleEmpty={isTitleEmpty} />
      {subTasks.length > 0 &&
        subTasks.map((subTask, index) => (
          <NewSubTask
            key={`${Math.random()}_${Math.random()}`}
            index={index}
            title={subTask.title}
            isChecked={subTask.isChecked}
          />
        ))}
      <NewSubTaskForm />
      <div className={classes.buttons}>
        <Link
          to="/"
          className={`${classes.button} ${classes.cancel} btn rounded-full`}
        >
          <img src={CancelImg} alt="cancel" />
        </Link>
        <Link
          to={`${title.trim() ? "/" : ""}`}
          className={`${classes.button} ${classes.done} btn rounded-full`}
          onClick={() => onAddTask(title, subTasks)}
        >
          <img className={classes.doneImg} src={DoneImg} alt="done" />
        </Link>
      </div>
    </>
  );
}
