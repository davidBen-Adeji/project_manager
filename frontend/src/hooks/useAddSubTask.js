import { useState } from "react";
import { useBaseContext } from "./useBaseContext";
import { useAuthContext } from "./useAuthContext";
import { useEditTaskContext } from "./useEditTaskContext";
import { useTasksContext } from "./useTasksContext";

export function useAddSubTask() {
  const [title, setTitle] = useState("");
  const [isInputFieldEmpty, setIsInputFieldEmpty] = useState(false);
  const { baseURI } = useBaseContext();
  const { user } = useAuthContext();
  const { editSubTasks, subTasks } = useEditTaskContext();
  const { getTasks, tasks } = useTasksContext();

  async function addSubTask(e, task_id, index, title) {
    e.preventDefault();

    if (!title) {
      setIsInputFieldEmpty(true);
      setTimeout(() => {
        setIsInputFieldEmpty(false);
      }, 300);
      return;
    }

    try {
      const response = await fetch(`${baseURI}/api/subTasks/${task_id}`, {
        method: "POST",
        body: JSON.stringify({ title }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const result = await response.json();

      if (response.ok) {
        setTitle("");
        editSubTasks([...subTasks, result.subTask]);
        const newTasks = tasks.toSpliced(index, 1, result.task);
        getTasks(newTasks);
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }

  return { isInputFieldEmpty, title, setTitle, addSubTask };
}
