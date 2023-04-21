import { routes } from "@renderer/App";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import "./index.css";

export const Navbar: FC = () => {
  return (
    <nav className="navbar">
      {routes.map((route) => (
        <NavLink
          key={route.path}
          to={route.path!}
          className={({ isActive }) => (isActive ? "active" : undefined)}
          end
        >
          {route.label}
        </NavLink>
      ))}
    </nav>
  );
};
