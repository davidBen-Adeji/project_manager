import { createContext, useCallback, useReducer } from "react";

export const NewTaskContext = createContext({
  title: "",
  subTasks: [],
  editTitle: () => {},
  editSubTasks: () => {},
});

function newTaskReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "EDIT_TITLE":
      return {
        ...state,
        title: payload,
      };
    case "EDIT_SUB_TASKS":
      return {
        ...state,
        subTasks: payload,
      };

    default:
      return state;
  }
}

export default function NewTaskContextProvider({ children }) {
  const [newTaskState, newTaskDispatch] = useReducer(newTaskReducer, {
    title: "",
    subTasks: [],
  });

  const value = {
    title: newTaskState.title,
    subTasks: newTaskState.subTasks,
    editTitle: useCallback(
      (payload) => newTaskDispatch({ type: "EDIT_TITLE", payload }),
      []
    ),
    editSubTasks: useCallback(
      (payload) => newTaskDispatch({ type: "EDIT_SUB_TASKS", payload }),
      []
    ),
  };
  return (
    <NewTaskContext.Provider value={value}>
      {children}
    </NewTaskContext.Provider>
  );
}
