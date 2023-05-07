import { User, UserConfig, UserConfigPayload } from "@renderer/types";
import { DB } from ".";

type PromiseUserConfig = Promise<UserConfig | null>;

export class UserConfigRepository extends DB {
  constructor() {
    super();
  }

  async getUserConfigs(): Promise<UserConfig[]> {
    return await this.userConfigs.toArray();
  }

  async getUserConfigByUserId(userId: User["id"]): PromiseUserConfig {
    return (await this.userConfigs
      .where("userId")
      .equals(userId)
      .first()) as UserConfig;
  }

  async getUserConfigById(id: UserConfig["id"]): PromiseUserConfig {
    return (await this.userConfigs.get(id)) as UserConfig;
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
