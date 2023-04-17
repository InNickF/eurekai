import { User, UserConfig } from "@renderer/types";
import { DB } from ".";

type PromiseUserConfig = Promise<UserConfig | null>;

export class UserConfigRepository extends DB {
  constructor() {
    super();
  }

  async getUserConfigById(userId: User["id"]): PromiseUserConfig {
    return (await this.userConfigs
      .where("userId")
      .equals(userId)
      .first()) as UserConfig;
  }

  async updateUserConfig(userConfig: UserConfig): Promise<UserConfig> {
    await this.userConfigs.update(userConfig.id, userConfig);
    return userConfig;
  }

  async deleteUserConfig(userConfigId: UserConfig["id"]): Promise<void> {
    await this.userConfigs.delete(userConfigId);
  }
}
