import { useAuthContext } from "./useAuthContext";
import { useBaseContext } from "./useBaseContext";
import { useTasksContext } from "./useTasksContext";
import { useBinContext } from "./useBinContext";

export function useDeleteTask() {
  const { user } = useAuthContext();
  const { baseURI } = useBaseContext();
  const { deleteTask } = useTasksContext();
  const { addItemToBin } = useBinContext();

  async function onDeleteTask(_id) {
    try {
      const response = await fetch(`${baseURI}/api/tasks/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const result = await response.json();

      if (!response.ok) return;

      addItemToBin(result.bin);
      deleteTask(result.task);
    } catch (error) {
      console.log(error);
    }
  }

  return onDeleteTask;
}
