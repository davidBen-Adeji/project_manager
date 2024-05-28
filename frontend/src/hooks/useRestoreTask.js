import { useBaseContext } from "./useBaseContext";
import { useAuthContext } from "./useAuthContext";
import { useTasksContext } from "./useTasksContext";
import { useBinContext } from "./useBinContext";

export function useRestoreTask() {
  const { baseURI } = useBaseContext();
  const { user } = useAuthContext();
  const { createTask } = useTasksContext();
  const { permanentlyDeleteItem } = useBinContext();

  async function onRestoreTask(_id) {
    try {
      const response = await fetch(`${baseURI}/api/bin/${_id}/restore`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const result = await response.json();

      if (!response.ok) return;

      createTask(result.task);
      permanentlyDeleteItem(result.bin);
    } catch (error) {
      console.log(error);
    }
  }

  return onRestoreTask;
}
