import { Chat, ChatPayload, ChatWithMessages } from "@renderer/types";
import { DB } from ".";
import { MessageRepository } from "./message";
import { NotFoundError, getCreatedAt, getUpdatedAt } from "@renderer/utils";

export class ChatRepository extends DB {
  constructor() {
    super();
  }

  async getAllChats(): Promise<Chat[]> {
    return await this.chats.toArray();
  }

  async getChatById(id: Chat["id"]): Promise<ChatWithMessages> {
    const chat = await this.chats.get(id);
    if (!chat) throw new NotFoundError();

    const messageRepository = new MessageRepository();
    const messages = await messageRepository.getMessagesByChatId(chat.id);
    return { ...chat, messages };
  }

  async getChatByUserId(id: Chat["userId"]): Promise<ChatWithMessages> {
    const chat = await this.chats.where("userId").equals(id).first();
    if (!chat) throw new NotFoundError();

    const messageRepository = new MessageRepository();
    const messages = await messageRepository.getMessagesByChatId(chat.id);
    return { ...chat, messages };
  }

  async getChatsByUserId(userId: Chat["userId"]): Promise<Chat[]> {
    return await this.chats.where("userId").equals(userId).toArray();
  }

  async addChat(chat: ChatPayload): Promise<Chat> {
    const chatId = (await this.chats.add({
      ...chat,
      createdAt: getCreatedAt(),
      updatedAt: getUpdatedAt(),
    } as Chat)) as number;
    const addedChat = await this.getChatById(chatId);
    return addedChat as Chat;
  }

  async updateChat(chat: Chat): Promise<Chat> {
    await this.chats.update(chat.id, { ...chat, updatedAt: getUpdatedAt() });
    return chat;
  }

  async deleteChat(chat: Chat): Promise<void> {
    await this.chats.delete(chat.id);
    const messageRepository = new MessageRepository();
    await messageRepository.deleteMessagesByChatId(chat.id);
  }

  async deleteChatsByUserId(userId: Chat["userId"]): Promise<void> {
    const chats = await this.getChatsByUserId(userId);
    await Promise.all(chats.map((chat) => this.deleteChat(chat)));
  }
}
