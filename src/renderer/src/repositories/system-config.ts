import { Config } from "@renderer/types";
import { DB } from ".";

type PromiseConfig = Promise<Config | null>;

export class ConfigRepository extends DB {
  constructor() {
    super();
  }

  async getAllConfigs(): Promise<Config[]> {
    return (await this.config.toArray()) as Config[];
  }

  async getConfigById(id: string): PromiseConfig {
    return (await this.config.get(id)) as Config;
  }

  async getFirstConfig(): PromiseConfig {
    return (await this.config.toArray()?.[0]) as Config;
  }
}
