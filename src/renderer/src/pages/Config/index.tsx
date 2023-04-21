import { FC } from "react";
import { Link } from "react-router-dom";
export const ConfigPage: FC = () => {
  return (
    <section className="grid place-content-center h-full">
      <p>Config</p>
      <Link to="/">Home</Link>
    </section>
  );
};
