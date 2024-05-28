import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

import { Link } from "react-router-dom";

import classes from "./Login.module.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {error, isLoading, loginUser} = useLogin()

 async function handleSubmit(e) {
    e.preventDefault();
    await loginUser(email, password)
  }

  return (
    <>
      <h2>Login</h2>

      <form className={classes.login} onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn" disabled={isLoading}>Login</button>
        {error && <div className={`${classes.error}`}>{error}</div>}
      </form>
      <p className={`text-center ${classes.p}`}>
        Don&apos;t have an account?{" "}
        <Link className={`${classes.link}`} to="/signup">
          Signup
        </Link>{" "}
        here
      </p>
    </>
  );
}
