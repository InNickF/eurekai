import { useChat } from "@renderer/services/queries/chats";
import { Page } from "@renderer/types";
import { AppLayout } from "@renderer/ui/components/layout/AppLayout";
import { notFoundErrorMessage } from "@renderer/utils";
import { parseError } from "@renderer/utils/errors";
import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Chat } from "./components/Chat";

export const ChatPage: Page<FC> = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();

  const { data: chat, isLoading } = useChat({
    chatId: Number(chatId),
    onError: (error) => {
      const parsedError = parseError(error);
      if (parsedError === notFoundErrorMessage) {
        navigate("/chats");
      }
    },
  });

  useEffect(() => {
    if (!chatId || chatId === ":chatId") {
      navigate("/chats");
    }
  }, []);

  return (
    <section>
      {isLoading ? <p>loading...</p> : null}
      {chat && !isLoading ? <Chat chat={chat} /> : null}
    </section>
  );
};

ChatPage.layout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};
