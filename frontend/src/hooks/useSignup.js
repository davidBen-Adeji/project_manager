import { useState } from "react";
import { useBaseContext } from "./useBaseContext";
import { useAuthContext } from "./useAuthContext";

export function useSignup() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { baseURI } = useBaseContext();
  const { login } = useAuthContext();

  async function signupUser(email, password) {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${baseURI}/api/user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(result.error);
    }

    if (response.ok) {
      login(result);
      setIsLoading(false);
    }
  }

  return { error, isLoading, signupUser };
}
