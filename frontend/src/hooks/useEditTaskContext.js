import { useContext } from "react";

import { EditTaskContext } from "../context/EditTaskContext";

export function useEditTaskContext() {
  const context = useContext(EditTaskContext);
  return context;
}
