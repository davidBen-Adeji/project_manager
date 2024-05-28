import { createContext, useCallback, useReducer } from "react";

const storedTasks = JSON.parse(localStorage.getItem("tasks")) || null;

export const TasksContext = createContext({
  tasks: [],
  getTasks: () => {},
  createTask: () => {},
  deleteTask: () => {},
});

function tasksReducer(state, action) {
  const { type, payload } = action;
  let filteredTasks = null;

  switch (type) {
    case "GET_TASKS":
      localStorage.setItem("tasks", JSON.stringify(payload));
      return { tasks: payload };

    case "CREATE_TASK":
      localStorage.setItem("tasks", JSON.stringify([payload, ...state.tasks]));
      return { tasks: [payload, ...state.tasks] };

    case "DELETE_TASK":
      filteredTasks = state.tasks.filter(({ _id }) => _id !== payload._id);
      localStorage.setItem("tasks", JSON.stringify(filteredTasks));
      return {
        tasks: filteredTasks,
      };
    default:
      return state;
  }
}

export default function TasksContextProvider({ children }) {
  const [tasksState, tasksDispatch] = useReducer(tasksReducer, {
    tasks: storedTasks,
  });

  const value = {
    tasks: tasksState.tasks,
    getTasks: useCallback((payload) => {
      tasksDispatch({ type: "GET_TASKS", payload });
    }, []),
    createTask: useCallback((payload) => {
      tasksDispatch({ type: "CREATE_TASK", payload });
    }, []),
    deleteTask: useCallback((payload) => {
      tasksDispatch({ type: "DELETE_TASK", payload });
    }, []),
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}
