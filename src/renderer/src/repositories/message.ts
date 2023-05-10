import { Message, MessagePayload } from "@renderer/types";
import { DB } from ".";
import { NotFoundError, getCreatedAt } from "@renderer/utils";

type PromiseMessage = Promise<Message>;

export class MessageRepository extends DB {
  constructor() {
    super();
  }

  orderByDate(messages: Message[]): Message[] {
    return messages.sort((a, b) => {
      return a.createdAt.getTime() - b.createdAt.getTime();
    });
  }

  async getAllMessages(): Promise<Message[]> {
    const messages = await this.messages.toArray();
    return this.orderByDate(messages);
  }

  async getMessagesByChatId(chatId: Message["chatId"]): Promise<Message[]> {
    const messages = await this.messages
      .where("chatId")
      .equals(chatId)
      .toArray();

    return this.orderByDate(messages);
  }

  async getMessagesByUserId(userId: Message["userId"]): Promise<Message[]> {
    const messages = await this.messages
      .where("userId")
      .equals(userId)
      .toArray();

    return this.orderByDate(messages);
  }

  async getMessageById(id: Message["id"]): PromiseMessage {
    const message = await this.messages.get(id);
    if (!message) throw new NotFoundError();

    return message;
  }

  async addMessage(message: MessagePayload): Promise<Message> {
    const messageId = (await this.messages.add({
      ...message,
      createdAt: getCreatedAt(),
    } as Message)) as number;
    const addedMessage = await this.getMessageById(messageId);
    return addedMessage as Message;
  }

  async updateMessage(message: Message): Promise<Message> {
    await this.messages.update(message.id, message);
    return message;
  }

  async deleteMessage(message: Message): Promise<void> {
    await this.messages.delete(message.id);
  }

  async deleteMessagesByChatId(chatId: Message["chatId"]): Promise<void> {
    const messages = await this.getMessagesByChatId(chatId);
    await Promise.all(messages.map((message) => this.deleteMessage(message)));
  }
}
