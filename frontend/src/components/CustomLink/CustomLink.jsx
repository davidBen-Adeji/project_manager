import { useResolvedPath, useMatch, Link } from "react-router-dom";

import classes from "./CustomLink.module.css";

export default function CustomLink({ to, children }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <Link
      className={`${classes.link} ${isActive ? "opacity-100" : "opacity-80"}`}
      to={to}
    >
      {children}
    </Link>
  );
}
