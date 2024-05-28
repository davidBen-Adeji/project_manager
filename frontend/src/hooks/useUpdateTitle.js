import { useBaseContext } from "./useBaseContext";
import { useAuthContext } from "./useAuthContext";
import { useTasksContext } from "./useTasksContext";

export function useUpdateTitle() {
  const { baseURI } = useBaseContext();
  const { user } = useAuthContext();
  const { getTasks, tasks } = useTasksContext();

  async function updateTitle(_id, index, title) {
    try {
      const response = await fetch(`${baseURI}/api/tasks/${_id}`, {
        method: "PATCH",
        body: JSON.stringify({ title: title.trim() }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const result = await response.json();

      if (response.ok) {
        const newTasks = tasks.toSpliced(index, 1, result);
        getTasks(newTasks);
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }

  return updateTitle;
}
