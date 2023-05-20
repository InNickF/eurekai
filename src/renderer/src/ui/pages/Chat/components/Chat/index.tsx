import { useAddNewUserMessageMutation } from "@renderer/services/mutations/messages";
import { ChatWithMessages } from "@renderer/types";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useInitializeChatOnMount } from "../../hooks/useInitializeChatOnMount";

interface ChatProps {
  chat: ChatWithMessages;
}
interface ChatForm {
  message: string;
}
export const Chat: FC<ChatProps> = ({ chat }) => {
  useInitializeChatOnMount({ chat });
  const addMessageMutation = useAddNewUserMessageMutation();
  const { register, handleSubmit, reset } = useForm<ChatForm>();

  const onSubmit = (data: ChatForm) => {
    addMessageMutation.mutate({
      userMessage: {
        chatId: chat.id,
        content: data.message,
        userId: chat.userId,
      },
    });
    reset();
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
      <form className="flex my-4" onSubmit={handleSubmit(onSubmit)}>
        <input className="w-full" {...register("message")} />
        <button className="px-4 w-max" type="submit">
          Send
        </button>
      </form>
      <Link to={`/`}>Go to home</Link>
    </section>
  );
};
