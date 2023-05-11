import { createChat, getChat } from "@renderer/services/api/chats";
import { createMessage } from "@renderer/services/api/message";
import { ChatPayload, ChatWithMessages, MessagePayload } from "@renderer/types";
import { splitText } from ".";
import { getSystemMessage, messageSystemDivider } from "./system-message";

interface CreateChatArgs {
  chat: ChatPayload;
  initialPrompt: string;
}
export const createChatWithMessages = async ({
  chat,
  initialPrompt,
}: CreateChatArgs): Promise<ChatWithMessages> => {
  const systemMessage = getSystemMessage({
    context: chat.context,
    speakersQuantity: chat.speakersQuantity,
  });

  const currentChat = await createChat({
    ...chat,
    systemMessage,
    initialized: false,
  });

  const serializedDataChunks = splitText({ text: chat.serializedData });

  const serializedMessages: MessagePayload[] = serializedDataChunks.map(
    (content) => ({
      userId: currentChat.userId,
      chatId: currentChat.id,
      content,
      role: "user",
      visible: false,
    })
  );

  const initialPromptWithDivider = `${initialPrompt}\n\n${messageSystemDivider}`;

  const initialMessage: MessagePayload = {
    userId: currentChat.userId,
    chatId: currentChat.id,
    content: initialPromptWithDivider,
    role: "user",
    visible: false,
  };

  const messages = [...serializedMessages, initialMessage];

  await messages.forEach(async (message) => {
    await createMessage(message);
  });

  return await getChat(currentChat.id);
};
