import { MessageRepository } from "@renderer/repositories/message";
import { MessageSchema } from "@renderer/schemas";
import { MessagePayload, Message } from "@renderer/types";
import { z } from "zod";

export const getMessages = async () => {
  const messageRepository = new MessageRepository();
  const response = await messageRepository.getAllMessages();
  return z.array(MessageSchema).parse(response);
};

export const getMessagesByChatId = async (chatId: Message["chatId"]) => {
  const messageRepository = new MessageRepository();
  const response = await messageRepository.getMessagesByChatId(chatId);
  return z.array(MessageSchema).parse(response);
};

export const getMessage = async (messageId: Message["id"]) => {
  const messageRepository = new MessageRepository();
  const response = await messageRepository.getMessageById(messageId);
  return MessageSchema.parse(response);
};

export const getMessageByUserId = async (userId: Message["userId"]) => {
  const messageRepository = new MessageRepository();
  const response = await messageRepository.getMessagesByUserId(userId);
  return MessageSchema.parse(response);
};

export const createMessage = async (message: MessagePayload) => {
  const messageRepository = new MessageRepository();
  const response = await messageRepository.addMessage(message);
  return MessageSchema.parse(response);
};

export const updateMessage = async (message: Message) => {
  const messageRepository = new MessageRepository();
  const response = await messageRepository.updateMessage(message);
  return MessageSchema.parse(response);
};

export const deleteMessage = async (message: Message) => {
  const messageRepository = new MessageRepository();
  await messageRepository.deleteMessage(message);
  return "Message deleted successfully.";
};
