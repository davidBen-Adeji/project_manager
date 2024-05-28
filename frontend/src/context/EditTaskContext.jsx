import { createContext, useCallback, useReducer } from "react";

export const EditTaskContext = createContext({
  _id: "",
  index: "",
  title: "",
  subTasks: [],
  editTitle: () => {},
  editSubTasks: () => {},
});

function editTaskReducer(state, action) {
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

export default function EditTaskContextProvider({
  _id,
  index,
  title,
  subTasks,
  children,
}) {
  const [editTaskState, editTaskDispatch] = useReducer(editTaskReducer, {
    _id,
    index,
    title,
    subTasks,
  });

  const value = {
    _id: editTaskState._id,
    index: editTaskState.index,
    title: editTaskState.title,
    subTasks: editTaskState.subTasks,
    editTitle: useCallback(
      (payload) => editTaskDispatch({ type: "EDIT_TITLE", payload }),
      []
    ),
    editSubTasks: useCallback(
      (payload) => editTaskDispatch({ type: "EDIT_SUB_TASKS", payload }),
      []
    ),
  };
  return (
    <EditTaskContext.Provider value={value}>
      {children}
    </EditTaskContext.Provider>
  );
}
