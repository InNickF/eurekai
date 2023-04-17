import { User } from "@renderer/types";
import { DB } from ".";
import { ChatRepository } from "./chat";
import { UserConfigRepository } from "./user-config";
import { PromptCategoryRepository } from "./prompt-category";

type PromiseUser = Promise<User | null>;

export class UserRepository extends DB {
  constructor() {
    super();
  }

  async getAllUsers(): Promise<User[]> {
    return await this.users.toArray();
  }

  async getUserById(id: User["id"]): PromiseUser {
    return (await this.users.get(id)) as User;
  }

  async getUserByName(name: User["name"]): PromiseUser {
    return (await this.users.get(name)) as User;
  }

  async addUser(user: User): Promise<User> {
    await this.users.add(user);
    return user;
  }

  async updateUser(user: User): Promise<User> {
    await this.users.update(user.id, user);
    return user;
  }

  async deleteUser(user: User): Promise<void> {
    await this.users.delete(user.id);

    const userConfig = new UserConfigRepository();
    await userConfig.deleteUserConfig(user.id);

    const userChats = new ChatRepository();
    await userChats.deleteChatsByUserId(user.id);

    const userCategories = new PromptCategoryRepository();
    await userCategories.deletePromptCategoriesByUserId(user.id);
  }
}
