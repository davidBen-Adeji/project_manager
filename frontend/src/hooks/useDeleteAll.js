import { useBaseContext } from "./useBaseContext";
import { useAuthContext } from "./useAuthContext";
import { useBinContext } from "./useBinContext";

export function useDeleteAll() {
  const { baseURI } = useBaseContext();
  const { user } = useAuthContext();
  const { permanentlyDeleteAll } = useBinContext();

  async function onDeleteAll() {
    try {
      const response = await fetch(`${baseURI}/api/bin/delete_all`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      await response.json();

      if (!response.ok) return;

      permanentlyDeleteAll();
    } catch (error) {
      console.log(error);
    }
  }

  return onDeleteAll;
}
