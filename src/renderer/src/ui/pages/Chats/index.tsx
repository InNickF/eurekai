import { AppLayout } from "@renderer/ui/components/layout/AppLayout";
import { Page } from "@renderer/types";
import { FC } from "react";

export const ChatsPage: Page<FC> = () => {
  return (
    <>
      <h1>chats</h1>
    </>
  );
};

ChatsPage.layout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};
