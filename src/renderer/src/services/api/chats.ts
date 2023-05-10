import { ChatRepository } from "@renderer/repositories/chat";
import { ChatSchema, ChatWithMessagesSchema } from "@renderer/schemas";
import { Chat, ChatPayload } from "@renderer/types";
import { z } from "zod";

export const getChats = async () => {
  const chatRepository = new ChatRepository();
  const response = await chatRepository.getAllChats();
  return z.array(ChatSchema).parse(response);
};

export const getChatsByUserId = async (userId: Chat["userId"]) => {
  const chatRepository = new ChatRepository();
  const response = await chatRepository.getChatsByUserId(userId);
  return z.array(ChatSchema).parse(response);
};

export const getChat = async (chatId: Chat["id"]) => {
  const chatRepository = new ChatRepository();
  const response = await chatRepository.getChatById(chatId);
  return ChatWithMessagesSchema.parse(response);
};

export const getChatByUserId = async (userId: Chat["userId"]) => {
  const chatRepository = new ChatRepository();
  const response = await chatRepository.getChatByUserId(userId);
  return ChatWithMessagesSchema.parse(response);
};

export const createChat = async (chat: ChatPayload) => {
  const chatRepository = new ChatRepository();
  const response = await chatRepository.addChat(chat);
  return ChatSchema.parse(response);
};

export const updateChat = async (chat: Chat) => {
  const chatRepository = new ChatRepository();
  const response = await chatRepository.updateChat(chat);
  return ChatSchema.parse(response);
};

export const deleteChat = async (chat: Chat) => {
  const chatRepository = new ChatRepository();
  await chatRepository.deleteChat(chat);
  return "Chat deleted successfully.";
};
