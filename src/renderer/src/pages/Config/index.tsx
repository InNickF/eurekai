import { AppLayout } from "@renderer/components/layout/AppLayout";
import { Page } from "@renderer/types";
import { FC } from "react";
import { Link } from "react-router-dom";

export const ConfigPage: Page<FC> = () => {
  return (
    <section className="grid place-content-center h-full">
      <h1>Config</h1>
      <Link to="/">Home</Link>
    </section>
  );
};

ConfigPage.layout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};
