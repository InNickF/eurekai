import { routes } from "@renderer/App";
import { LogoutButton } from "@renderer/ui/components/commons/LogoutButton";
import { useMe } from "@renderer/services/queries/users";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import "./index.css";

export const Navbar: FC = () => {
  const ignoredRoutes = ["/login", "/chats/:chatId"];
  const finalRoutes = routes.filter(
    (route) => !ignoredRoutes.includes(route.path!)
  );
  const { data: user } = useMe();

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
