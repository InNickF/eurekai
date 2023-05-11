import { AppLayout } from "@renderer/ui/components/layout/AppLayout";
import { Page } from "@renderer/types";
import { FC } from "react";
import { ChatFromVideoForm } from "./components/ChatFromVideoForm";

export const HomePage: Page<FC> = () => {
  return (
    <>
      <header className="mb-12">
        <h1>Create a new conversation.</h1>
        <p>Explore all the hidden ideas in your content now!</p>
      </header>
      <ChatFromVideoForm />
    </>
  );
};

HomePage.layout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};
