import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

import { Link } from "react-router-dom";

import classes from "./Signup.module.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isLoading, signupUser } = useSignup();

  async function handleSubmit(e) {
    e.preventDefault();
    await signupUser(email, password);
  }

  return (
    <>
      <h2>Signup</h2>

      <form className={classes.signup} onSubmit={handleSubmit}>
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

        <button className="btn" disabled={isLoading}>
          Sign Up
        </button>
        {error && <div className={`${classes.error}`}>{error}</div>}
      </form>
      <p className={`text-center ${classes.p}`}>
        Have an account?{" "}
        <Link className={`${classes.link}`} to="/login">
          Login
        </Link>{" "}
        here
      </p>
    </>
  );
}
