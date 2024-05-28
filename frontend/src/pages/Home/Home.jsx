import { useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useTasksContext } from "../../hooks/useTasksContext";
import { useFetchTasks } from "../../hooks/useFetchTasks";
import { useFetchBin } from "../../hooks/useFetchBin";

import { Link } from "react-router-dom";

import AddImg from "../../assets/svg/add.svg";
import BlackTaskImg from "../../assets/svg/task.svg";
import BlueTaskImg from "../../assets/svg/task-blue.svg";
import OrangeTaskImg from "../../assets/svg/task-orange.svg";
import RedTaskImg from "../../assets/svg/task-red.svg";

import classes from "./Home.module.css";

import Task from "../../components/Task/Task";

export default function Home() {
  const { tasks } = useTasksContext();
  const { user } = useAuthContext();
  const fetchTasks = useFetchTasks();
  const fetchBin = useFetchBin();

  let taskImg = BlackTaskImg;

  switch (user.themePreference) {
    case "blue":
      taskImg = BlueTaskImg;
      break;

    case "orange":
      taskImg = OrangeTaskImg;
      break;

    case "red":
      taskImg = RedTaskImg;
      break;
  }

  useEffect(() => {
    async function fetchTasksAndBin() {
      await fetchTasks();
      await fetchBin();
    }
    fetchTasksAndBin();
  }, [fetchTasks, fetchBin]);

  return (
    <>
      <div className={classes.header}>
        <img src={taskImg} alt="task" />
        <h1 className={`${classes.headerText} text`}>Task</h1>
      </div>
      {!tasks && <div className={`spinner ${classes.spin}`}></div>}
      {tasks && tasks.length > 0 && (
        <ul>
          {tasks.map((task, index) => (
            <Task
              key={task._id}
              _id={task._id}
              index={index}
              title={task.title}
              isChecked={task.isChecked}
            />
          ))}
        </ul>
      )}
      {tasks && tasks.length <= 0 && (
        <img src={taskImg} alt="task image" className={classes.taskImg} />
      )}{" "}
      <Link className={`${classes.newTaskButton} btn rounded-full`} to="/new">
        <img className={classes.addImg} src={AddImg} alt="add a new task" />
      </Link>
    </>
  );
}
