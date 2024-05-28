import { useState } from "react";
import { useBaseContext } from "./useBaseContext";
import { useAuthContext } from "./useAuthContext";
import { useTasksContext } from "./useTasksContext";

export function useAddNewTask() {
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);

  const { baseURI } = useBaseContext();
  const { user } = useAuthContext();
  const { createTask } = useTasksContext();

  async function onAddTask(title, subTasks) {
    if (!title.trim()) {
      setIsTitleEmpty(true);
      setTimeout(() => {
        setIsTitleEmpty(false);
      }, 300);
      return;
    }

    const task = { title: title.trim(), subTasks };

    try {
      const response = await fetch(`${baseURI}/api/tasks/`, {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        createTask(result);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return { isTitleEmpty, onAddTask };
}
