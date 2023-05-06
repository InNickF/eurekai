import { Chat, ChatPayload } from "@renderer/types";
import { DB } from ".";
import { MessageRepository } from "./message";

type PromiseChat = Promise<Chat | null>;

export class ChatRepository extends DB {
  constructor() {
    super();
  }

  async getAllChats(): Promise<Chat[]> {
    return await this.chats.toArray();
  }

  async getChatById(id: Chat["id"]): PromiseChat {
    return (await this.chats.get(id)) as Chat;
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
