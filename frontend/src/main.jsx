import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import BaseContextProvider from "./context/BaseContext.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";
import TasksContextProvider from "./context/TasksContext.jsx";
import BinContextProvider from "./context/BinContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BaseContextProvider>
      <AuthContextProvider>
        <TasksContextProvider>
          <BinContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </BinContextProvider>
        </TasksContextProvider>
      </AuthContextProvider>
    </BaseContextProvider>
  </React.StrictMode>
);
