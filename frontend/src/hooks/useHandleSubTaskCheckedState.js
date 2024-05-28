import { useBaseContext } from "./useBaseContext";
import { useAuthContext } from "./useAuthContext";
import { useEditTaskContext } from "./useEditTaskContext";
import { useTasksContext } from "./useTasksContext";

export function useHandleSubTaskCheckedState() {
  const { baseURI } = useBaseContext();
  const { user } = useAuthContext();
  const { editSubTasks, subTasks } = useEditTaskContext();
  const { getTasks, tasks } = useTasksContext();

  async function handleCheckedState(_id, task_id, index, taskIndex, isChecked) {
    try {
      const response = await fetch(
        `${baseURI}/api/subTasks/${task_id}/${_id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ isChecked: !isChecked }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const result = await response.json();

      if (response.ok) {
        const newSubTasks = subTasks.toSpliced(index, 1, result.subTask);
        editSubTasks(newSubTasks);

        const newTasks = tasks.toSpliced(taskIndex, 1, result.task);
        getTasks(newTasks);
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }

  return handleCheckedState;
}
