import { useContext } from "react";

import { BaseContext } from "../context/BaseContext";

export function useBaseContext() {
    const context = useContext(BaseContext);

    return context;
}