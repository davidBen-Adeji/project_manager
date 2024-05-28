import { createContext, useCallback, useReducer } from "react";

const storedBin = JSON.parse(localStorage.getItem("bin")) || null;

export const BinContext = createContext({
  bin: [],
  getDeletedItems: () => {},
  addItemToBin: () => {},
  permanentlyDeleteItem: () => {},
  permanentlyDeleteAll: () => {},
});

function binReducer(state, action) {
  const { type, payload } = action;
  let filteredBin = null;

  switch (type) {
    case "GET_ITEMS":
      localStorage.setItem("bin", JSON.stringify(payload));
      return { bin: payload };

    case "ADD_ITEM":
      localStorage.setItem(
        "bin",
        JSON.stringify([payload, ...state.bin])
      );
      return { bin: [payload, ...state.bin] };

    case "DELETE_ITEM":
      filteredBin = state.bin.filter(
        ({ _id }) => _id !== payload._id
      );
      localStorage.setItem("bin", JSON.stringify(filteredBin));
      return { bin: filteredBin };

    case "DELETE_ALL":
      localStorage.setItem("bin", JSON.stringify(null))
      return { bin: null };
    default:
      return state;
  }
}

export default function BinContextProvider({ children }) {
  const [binState, binDispatch] = useReducer(binReducer, { bin: storedBin });

  const value = {
    bin: binState.bin,
    getDeletedItems: useCallback((payload) => {
      binDispatch({ type: "GET_ITEMS", payload });
    }, []),
    addItemToBin: useCallback((payload) => {
      binDispatch({ type: "ADD_ITEM", payload });
    }, []),
    permanentlyDeleteItem: useCallback((payload) => {
      binDispatch({ type: "DELETE_ITEM", payload });
    }, []),
    permanentlyDeleteAll: useCallback(() => {
      binDispatch({ type: "DELETE_ALL" });
    }, []),
  };

  return <BinContext.Provider value={value}>{children}</BinContext.Provider>;
}
