import { useBaseContext } from "./useBaseContext";
import { useAuthContext } from "./useAuthContext";

export function useChangeTheme() {
  const { baseURI } = useBaseContext();
  const { user, login } = useAuthContext();
  const { email, themePreference } = user;

  async function onChangeTheme(color) {
    try {
      const response = await fetch(`${baseURI}/api/user/${email}`, {
        method: "PATCH",
        body: JSON.stringify({ themePreference: color }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const result = await response.json();

      if (response.ok) {
        login(result);
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }

  return { themePreference, onChangeTheme };
}
