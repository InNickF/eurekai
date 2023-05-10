import { User, UserPayload } from "@renderer/types";
import { DB } from ".";
import { ChatRepository } from "./chat";
import { UserConfigRepository } from "./user-config";
import { PromptCategoryRepository } from "./prompt-category";
import { NotFoundError } from "@renderer/utils";

type PromiseUser = Promise<User>;

export class UserRepository extends DB {
  constructor() {
    super();
  }

  async getAllUsers(): Promise<User[]> {
    return await this.users.toArray();
  }

  async getUserById(id: User["id"]): PromiseUser {
    const user = await this.users.get(id);
    if (!user) throw new NotFoundError();
    return user;
  }

  async getUserByName(name: User["name"]): PromiseUser {
    const user = await this.users.where("name").equals(name).first();
    if (!user) throw new NotFoundError();
    return user;
  }

  async addUser(user: UserPayload): Promise<User> {
    await this.users.add(user as User);
    const newUser = (await this.getUserByName(user.name)) as User;
    const userConfigRepository = new UserConfigRepository();
    await userConfigRepository.addUserConfig({
      userId: newUser.id,
      apiKey: "",
    });
    return newUser;
  }

  async updateUser(user: User): Promise<User> {
    await this.users.update(user.id, user);
    const updatedUser = await this.getUserById(user.id);
    return updatedUser as User;
  }

  async deleteUser(user: User): Promise<void> {
    await this.users.delete(user.id);

    const userConfig = new UserConfigRepository();
    await userConfig.deleteUserConfigByUserId(user.id);

    const userChats = new ChatRepository();
    await userChats.deleteChatsByUserId(user.id);

    const userCategories = new PromptCategoryRepository();
    await userCategories.deletePromptCategoriesByUserId(user.id);
  }
}
