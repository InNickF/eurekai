import { AppLayout } from "@renderer/components/layout/AppLayout";
import { Page } from "@renderer/types";
import { FC } from "react";

export const HomePage: Page<FC> = () => {
  return (
    <>
      <h1>Hi</h1>
    </>
  );
};

HomePage.layout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};
