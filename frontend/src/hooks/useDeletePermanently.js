import { useBaseContext } from "./useBaseContext";
import { useAuthContext } from "./useAuthContext";
import { useBinContext } from "./useBinContext";

export function useDeletePermanently() {
    const {baseURI} = useBaseContext()
    const {user} = useAuthContext()
    const {permanentlyDeleteItem} = useBinContext();

  async function onDeletePermanently(_id) {
    try {
      const response = await fetch(`${baseURI}/api/bin/${_id}/delete`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const result = await response.json();

      if (!response.ok) return;

      permanentlyDeleteItem(result);
    } catch (error) {
      console.log(error);
    }
  }

  return onDeletePermanently;
}
