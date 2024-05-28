import { useContext } from "react";

import { BinContext } from "../context/BinContext";

export function useBinContext() {
  const context = useContext(BinContext);

  if (!context) {
    throw Error(
      "useBinContext must be used inside a BinContextProvider"
    );
  }

  return context;
}
