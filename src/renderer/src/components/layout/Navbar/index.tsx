import { routes } from "@renderer/App";
import { LogoutButton } from "@renderer/components/commons/LogoutButton";
import { userAtom } from "@renderer/state/users";
import { useAtom } from "jotai";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import "./index.css";

export const Navbar: FC = () => {
  const [user] = useAtom(userAtom);
  const finalRoutes = routes.filter((route) => route.path !== "/login");
  return (
    <nav className="navbar">
      <section>
        {finalRoutes.map((route) => (
          <NavLink
            key={route.path}
            to={route.path!}
            className={({ isActive }) => (isActive ? "active" : undefined)}
            end
          >
            {route.label}
          </NavLink>
        ))}
      </section>
      <section>
        {user?.name}
        <LogoutButton />
      </section>
    </nav>
  );
};
