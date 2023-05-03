import { FC } from "react";
import { Link } from "react-router-dom";
import { UserSelector } from "./components/UserSelector";

export const HomePage: FC = () => {
  return (
    <section className="grid place-content-center h-full">
      <h1>Hello Word</h1>
      <Link to="/config">Config</Link>
      <UserSelector />
    </section>
  );
};
