import { useCallback } from "react";
import { useBaseContext } from "./useBaseContext";
import { useBinContext } from "./useBinContext";
import { useAuthContext } from "./useAuthContext";

export function useFetchBin() {
    const { baseURI } = useBaseContext();
    const { getDeletedItems } = useBinContext();
    const { user } = useAuthContext();

    const fetchBin = useCallback(async () => {
        try {
            const response = await fetch(`${baseURI}/api/bin/`, {
              headers: { Authorization: `Bearer ${user.token}` },
            });
            const result = await response.json();
            if (response.ok) {
              getDeletedItems(result);
            }
          } catch (error) {
            console.log(error);
          }
    }, [baseURI, getDeletedItems, user])

    return fetchBin
}