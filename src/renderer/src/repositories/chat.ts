import { Chat, ChatPayload, ChatWithMessages } from "@renderer/types";
import { DB } from ".";
import { MessageRepository } from "./message";

type PromiseChat = Promise<ChatWithMessages | null>;

export class ChatRepository extends DB {
  constructor() {
    super();
  }

  async getAllChats(): Promise<Chat[]> {
    return await this.chats.toArray();
  }

  async getChatById(id: Chat["id"]): PromiseChat {
    const chat = await this.chats.get(id);
    if (!chat) return null;
    const messageRepository = new MessageRepository();
    const messages = await messageRepository.getMessagesByChatId(chat.id);
    return { ...chat, messages } as ChatWithMessages;
  }

  async getChatByUserId(id: Chat["userId"]): PromiseChat {
    const chat = await this.chats.where("userId").equals(id).first();
    if (!chat) return null;
    const messageRepository = new MessageRepository();
    const messages = await messageRepository.getMessagesByChatId(chat.id);
    return { ...chat, messages } as ChatWithMessages;
  }

  async getChatsByUserId(userId: Chat["userId"]): Promise<Chat[]> {
    return (await this.chats
      .where("userId")
      .equals(userId)
      .toArray()) as Chat[];
  }

  async addChat(chat: ChatPayload): Promise<Chat> {
    const chatId = (await this.chats.add(chat as Chat)) as number;
    const addedChat = await this.getChatById(chatId);
    return addedChat as Chat;
  }

  async updateChat(chat: Chat): Promise<Chat> {
    await this.chats.update(chat.id, chat);
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
