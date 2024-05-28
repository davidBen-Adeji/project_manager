import { useContext } from "react";

import { TasksContext } from "../context/TasksContext";

export function useTasksContext() {
  const context = useContext(TasksContext);

  if (!context) {
    throw Error(
      "useTasksContext must be used inside a ProjectsContextProvider"
    );
  }

  return context;
}
