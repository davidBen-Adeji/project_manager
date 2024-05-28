import { createContext, useReducer, useCallback } from "react";

const storedUser = JSON.parse(localStorage.getItem("user")) || null;

export const AuthContext = createContext({
  user: {},
  login: () => {},
  logout: () => {},
});

function authReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(payload));
      return { user: payload };

    case "LOGOUT":
      localStorage.removeItem("user");
      return { user: null };

    default:
      return state;
  }
}

export default function AuthContextProvider({ children }) {
  const [authContextState, authContextDispatch] = useReducer(authReducer, {
    user: storedUser,
  });

  const value = {
    user: authContextState.user,
    login: useCallback((payload) => {
      authContextDispatch({ type: "LOGIN", payload });
    }, []),
    logout: useCallback(() => {
      authContextDispatch({ type: "LOGOUT" });
    }, []),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
