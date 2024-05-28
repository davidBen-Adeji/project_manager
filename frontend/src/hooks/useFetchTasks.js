import { useCallback } from "react";
import { useBaseContext } from "./useBaseContext";
import { useAuthContext } from "./useAuthContext";
import { useTasksContext } from "./useTasksContext";

export function useFetchTasks() {
  const { baseURI } = useBaseContext();
  const { getTasks } = useTasksContext();
  const { user } = useAuthContext();

 const fetchTasks = useCallback(async () => {
    try {
      const response = await fetch(`${baseURI}/api/tasks/`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const result = await response.json();
      if (response.ok) {
        getTasks(result);
      }
    } catch (error) {
      console.log(error);
    }
  }, [baseURI, user, getTasks])

  return fetchTasks;
}
