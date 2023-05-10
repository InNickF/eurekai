import { AppLayout } from "@renderer/ui/components/layout/AppLayout";
import { Page } from "@renderer/types";
import { FC } from "react";
import { ChatFromVideoForm } from "./components/ChatFromVideoForm";

export const HomePage: Page<FC> = () => {
  return (
    <>
      <h1>Hi</h1>
      <ChatFromVideoForm />
    </>
  );
};

HomePage.layout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};
