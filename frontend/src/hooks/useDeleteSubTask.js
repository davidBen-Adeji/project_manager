import { useBaseContext } from "./useBaseContext";
import { useAuthContext } from "./useAuthContext";
import { useEditTaskContext } from "./useEditTaskContext";
import { useTasksContext } from "./useTasksContext";

export function useDeleteSubTask() {
  const { baseURI } = useBaseContext();
  const { user } = useAuthContext();
  const { editSubTasks, subTasks } = useEditTaskContext();
  const { getTasks, tasks } = useTasksContext();

  async function onDeleteSubTask(_id, task_id, index, taskIndex) {
    try {
      const response = await fetch(
        `${baseURI}/api/subTasks/${task_id}/${_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        const newSubTasks = subTasks.toSpliced(index, 1)
        editSubTasks(newSubTasks);

        const newTasks = tasks.toSpliced(taskIndex, 1, result);
        getTasks(newTasks);
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }

  return onDeleteSubTask;
}
