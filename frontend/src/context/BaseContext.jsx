import { createContext } from "react";

export const BaseContext = createContext({
  baseURI: "",
});

export default function BaseContextProvider({ children }) {
  const baseURI = import.meta.env.VITE_API_URL;

  return (
    <BaseContext.Provider value={{baseURI}}>{children}</BaseContext.Provider>
  );
}
