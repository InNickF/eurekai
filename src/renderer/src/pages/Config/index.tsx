import { FC } from "react";
import { Link } from "react-router-dom";
export const ConfigPage: FC = () => {
  return (
    <section className="grid place-content-center h-full">
      <h1>Config</h1>
      <Link to="/">Home</Link>
    </section>
  );
};
