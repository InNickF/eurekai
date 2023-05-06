import {
  ChatSchema,
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
  DBStore,
  User,
  UserConfig,
} from "@renderer/types";
import { schemaToString } from "@renderer/utils";
import Dexie, { Table } from "dexie";

const usersStore: DBStore = {
  users: schemaToString(UserSchema),
};

const usersConfigStore: DBStore = {
  userConfigs: schemaToString(UserConfigSchema),
};

// const configStore: Store = {
//   config: schemaToString(ConfigSchema),
// };

const promptsStore: DBStore = {
  prompts: schemaToString(PromptSchema),
};

const promptCategoriesStore: DBStore = {
  promptCategories: schemaToString(PromptCategorySchema),
};

const messagesStore: DBStore = {
  messages: schemaToString(MessageSchema),
};

const chatsStore: DBStore = {
  chats: schemaToString(ChatSchema),
};

export class DB extends Dexie {
  users!: Table<User>;
  userConfigs!: Table<UserConfig>;
  // config!: Table<Config>;
  chats!: Table<Chat>;
  messages!: Table<Message>;
  promptCategories!: Table<PromptCategory>;
  prompts!: Table<Prompt>;

  constructor() {
    super("eurekai");
    this.version(1).stores({
      ...usersStore,
      ...usersConfigStore,
      // ...configStore,
      ...chatsStore,
      ...messagesStore,
      ...promptCategoriesStore,
      ...promptsStore,
    });
    // this.config
    //   .count()
    //   .then((count) => count > 0)
    //   .then((hasConfig) => {
    //     if (!hasConfig) {
    //       this.config.add({ id: 1, currentUserId: null });
    //     }
    //   });
  }
}
