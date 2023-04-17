import {
  ChatSchema,
  ConfigSchema,
  MessageSchema,
  PromptCategorySchema,
  PromptSchema,
  UserConfigSchema,
  UserSchema,
} from "@renderer/schemas";
import {
  Chat,
  Message,
  Prompt,
  PromptCategory,
  Store,
  User,
  UserConfig,
} from "@renderer/types";
import { schemaToString } from "@renderer/utils";
import Dexie, { Table } from "dexie";
import { Config } from "electron";

const usersStore: Store = {
  users: schemaToString(UserSchema),
};

const usersConfigStore: Store = {
  userConfigs: schemaToString(UserConfigSchema),
};

const configStore: Store = {
  config: schemaToString(ConfigSchema),
};

const promptsStore: Store = {
  config: schemaToString(PromptSchema),
};

const promptCategoriesStore: Store = {
  config: schemaToString(PromptCategorySchema),
};

const messagesStore: Store = {
  config: schemaToString(MessageSchema),
};

const chatsStore: Store = {
  config: schemaToString(ChatSchema),
};

export class DB extends Dexie {
  users!: Table<User>;
  userConfigs!: Table<UserConfig>;
  config!: Table<Config>;
  chats!: Table<Chat>;
  messages!: Table<Message>;
  promptCategories!: Table<PromptCategory>;
  prompts!: Table<Prompt>;

  constructor() {
    super("eurekai");
    this.version(1).stores({
      ...usersStore,
      ...usersConfigStore,
      ...configStore,
      ...chatsStore,
      ...messagesStore,
      ...promptCategoriesStore,
      ...promptsStore,
    });
  }
}
