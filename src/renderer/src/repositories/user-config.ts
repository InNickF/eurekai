import { User, UserConfig, UserConfigPayload } from "@renderer/types";
import { DB } from ".";
import { NotFoundError } from "@renderer/utils";

type PromiseUserConfig = Promise<UserConfig>;

export class UserConfigRepository extends DB {
  constructor() {
    super();
  }

  async getUserConfigs(): Promise<UserConfig[]> {
    return await this.userConfigs.toArray();
  }

  async getUserConfigByUserId(userId: User["id"]): PromiseUserConfig {
    const userConfig = await this.userConfigs
      .where("userId")
      .equals(userId)
      .first();
    if (!userConfig) throw new NotFoundError();
    return userConfig;
  }

  async getUserConfigById(id: UserConfig["id"]): PromiseUserConfig {
    const prompt = await this.userConfigs.get(id);
    if (!prompt) throw new NotFoundError();
    return prompt;
  }

  async addUserConfig(userConfig: UserConfigPayload): Promise<UserConfig> {
    await this.userConfigs.add(userConfig as unknown as UserConfig);
    const newUserConfig = await this.getUserConfigByUserId(userConfig.userId);
    return newUserConfig as UserConfig;
  }

  async updateUserConfig(userConfig: UserConfig): Promise<UserConfig> {
    await this.userConfigs.update(userConfig.id, userConfig);
    return userConfig;
  }

  async deleteUserConfig(userConfigId: UserConfig["id"]): Promise<void> {
    await this.userConfigs.delete(userConfigId);
  }

  async deleteUserConfigByUserId(userId: User["id"]): Promise<void> {
    const userConfig = await this.getUserConfigByUserId(userId);
    if (userConfig) await this.userConfigs.delete(userConfig.id);
  }
}
