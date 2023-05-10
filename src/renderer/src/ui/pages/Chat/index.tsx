import { useChat } from "@renderer/services/queries/chats";
import { Page } from "@renderer/types";
import { AppLayout } from "@renderer/ui/components/layout/AppLayout";
import { notFoundErrorMessage } from "@renderer/utils";
import { parseError } from "@renderer/utils/errors";
import { FC } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

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

  if (!chatId) {
    navigate("/chats");
    return null;
  }

  return (
    <section>
      <p>chat id: {chatId}</p>
      {isLoading ? <p>loading...</p> : null}
      {chat ? (
        <>
          <p>{chat.title || chat.context || "Untitled chat"}</p>
          <p>{chat.systemMessage}</p>
          <p>{chat.description}</p>
          {chat.messages?.map((message) => (
            <div key={message.id}>
              <p>{message.content}</p>
            </div>
          ))}
        </>
      ) : null}
      <Link to={`/`}>Go to home</Link>
    </section>
  );
};

ChatPage.layout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};
