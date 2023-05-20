import { getChat, updateChat } from "@renderer/services/api/chats";
import { createMessage } from "@renderer/services/api/message";
import { getChatCompletion } from "@renderer/services/api/openai";
import { getUser } from "@renderer/services/api/users";
import {
  ChatWithMessages,
  MessagePayload,
  OpenAIMessage,
} from "@renderer/types";

export interface InitializeChatArgs {
  chat: ChatWithMessages;
}
export const initializeChat = async ({
  chat,
}: InitializeChatArgs): Promise<ChatWithMessages> => {
  const { messages, ...restChat } = chat;
  const user = await getUser(restChat.userId);
  if (!user.config.apiKey) throw new Error("User does not have an API Key");

  const systemMessage: OpenAIMessage = {
    content: restChat.systemMessage!,
    role: "system",
  };

  const newMessages = [
    systemMessage,
    ...messages.map((message) => ({
      content: message.content,
      role: message.role,
      name: user.name,
    })),
  ];

  const AIResponse = await getChatCompletion({
    messages: newMessages,
    openAIKey: user.config.apiKey,
  });

  const AIMessage = AIResponse.choices[0].message;

  await createMessage({
    ...AIMessage,
    chatId: restChat.id,
    userId: restChat.userId,
    visible: true,
  });

  const updatedChat = updateChat({
    ...restChat,
    initialized: true,
  });

  return updatedChat;
};

export interface AddNewUserMessageArgs {
  userMessage: Omit<MessagePayload, "role" | "visible">;
}
export const addNewUserMessage = async ({
  userMessage,
}: AddNewUserMessageArgs): Promise<ChatWithMessages> => {
  const chat = await getChat(userMessage.chatId);
  const { messages, ...restChat } = chat;
  const user = await getUser(restChat.userId);
  if (!user.config.apiKey) throw new Error("User does not have an API Key");

  const systemMessage: OpenAIMessage = {
    content: restChat.systemMessage!,
    role: "system",
  };

  const newMessage: OpenAIMessage = {
    content: userMessage.content,
    role: "user",
    name: user.name,
  };

  const newMessages = messages.map((message) => ({
    content: message.content,
    role: message.role,
    name: user.name,
  }));

  const AIResponse = await getChatCompletion({
    messages: [systemMessage, ...newMessages, newMessage],
    openAIKey: user.config.apiKey,
  });

  const AIMessage = AIResponse.choices[0].message;

  await createMessage({
    ...userMessage,
    chatId: restChat.id,
    role: "user",
    visible: true,
  });

  await createMessage({
    ...AIMessage,
    chatId: restChat.id,
    userId: restChat.userId,
    visible: true,
  });

  const updatedChat = await getChat(userMessage.chatId);

  return updatedChat;
};
