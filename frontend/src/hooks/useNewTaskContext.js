import { useContext } from "react";

import { NewTaskContext } from "../context/NewTaskContext";

export function useNewTaskContext() {
  const context = useContext(NewTaskContext);
  return context;
}
