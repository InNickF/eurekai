import { ChatWithMessages } from "@renderer/types";
import { FC, useEffect } from "react";
import { Link } from "react-router-dom";

interface ChatProps {
  chat: ChatWithMessages;
}

export const Chat: FC<ChatProps> = ({ chat }) => {
  useEffect(() => {
    initializeChat();
  }, []);

  const initializeChat = () => {
    if (chat.initialized) return;
    console.log("chat not initialized");
  };

  return (
    <section>
      <p>chat id: {chat.id}</p>
      <p>{chat.title || chat.context || "Untitled chat"}</p>
      <p>{chat.systemMessage}</p>
      <p>{chat.description}</p>
      <section className="my-8 flex flex-col flex-wrap gap-4">
        {chat.messages?.map((message) => (
          <div key={message.id}>
            <p className="mb-1">
              <strong>{message.role}</strong>:
            </p>
            <p>{message.content}</p>
          </div>
        ))}
      </section>
      <Link to={`/`}>Go to home</Link>
    </section>
  );
};
