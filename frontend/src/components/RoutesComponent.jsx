import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";

import { Route, Routes, Navigate } from "react-router-dom";

import EditTaskContextProvider from "../context/EditTaskContext";
import NewTaskContextProvider from "../context/NewTaskContext";

// pages
import Home from "../pages/Home/Home";
import EditTask from "../pages/EditTask/EditTask";
import NewTask from "../pages/NewTask/NewTask";
import Bin from "../pages/Bin/Bin";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";

export default function RoutesComponent() {
  const { tasks } = useTasksContext();
  const { user } = useAuthContext();

  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
      <Route
        path="/new"
        element={
          user ? (
            <NewTaskContextProvider>
              <NewTask />
            </NewTaskContextProvider>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/bin" element={user ? <Bin /> : <Navigate to="/login" />} />
      {user &&
        tasks &&
        tasks.length > 0 &&
        tasks.map((task, index) => (
          <Route
            key={task._id}
            path={`/${task._id}`}
            element={
              <EditTaskContextProvider
                _id={task._id}
                index={index}
                title={task.title}
                subTasks={task.subTasks}
              >
                <EditTask />
              </EditTaskContextProvider>
            }
          />
        ))}
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route
        path="/signup"
        element={!user ? <Signup /> : <Navigate to="/" />}
      />
      <Route
        path="*"
        element={user ? <NotFound /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}
