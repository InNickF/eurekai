import { User, UserPayload, UserWithConfig } from "@renderer/types";
import { NotFoundError } from "@renderer/utils";
import { DB } from ".";
import { ChatRepository } from "./chat";
import { PromptCategoryRepository } from "./prompt-category";
import { UserConfigRepository } from "./user-config";

type PromiseUser = Promise<UserWithConfig>;

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
    const userConfigRepository = new UserConfigRepository();
    const userConfig = await userConfigRepository.getUserConfigByUserId(
      user.id
    );
    if (!userConfig) throw new NotFoundError();
    return { ...user, config: userConfig };
  }

  async getUserByName(name: User["name"]): PromiseUser {
    const user = await this.users.where("name").equals(name).first();
    if (!user) throw new NotFoundError();
    const userConfigRepository = new UserConfigRepository();
    const userConfig = await userConfigRepository.getUserConfigByUserId(
      user.id
    );
    if (!userConfig) throw new NotFoundError();
    return { ...user, config: userConfig };
  }

  async addUser(user: UserPayload): PromiseUser {
    const userId = (await this.users.add(user as User)) as number;
    const userConfigRepository = new UserConfigRepository();
    await userConfigRepository.addUserConfig({
      userId: userId,
      apiKey: "",
    });

    const newUser = (await this.getUserByName(user.name)) as User;
    const newConfig = await userConfigRepository.getUserConfigByUserId(
      newUser.id
    );
    return { ...newUser, config: newConfig };
  }

  async updateUser(user: User): PromiseUser {
    await this.users.update(user.id, user);
    const updatedUser = await this.getUserById(user.id);
    return updatedUser;
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
