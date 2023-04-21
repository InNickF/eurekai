import { FC } from "react";
import { Link } from "react-router-dom";

export const HomePage: FC = () => {
  return (
    <section className="grid place-content-center h-full">
      <p>Hello Word</p>
      <Link to="/config">Config</Link>
    </section>
  );
};
