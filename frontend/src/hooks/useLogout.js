import { useAuthContext } from "./useAuthContext";
// import { useTasksContext } from "./useTasksContext";
// import { useBinContext } from "./useBinContext";

export function useLogout() {
  const { logout } = useAuthContext();
  // const { getTasks } = useTasksContext();
  // const { permanentlyDeleteAll } = useBinContext();

  function logoutUser() {
    // getTasks(null);
    // permanentlyDeleteAll();
    logout();
    localStorage.removeItem("tasks");
    localStorage.removeItem("bin");
  }

  return logoutUser;
}
