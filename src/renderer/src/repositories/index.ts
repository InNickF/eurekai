import {
  initialComplexPrompts,
  initialSimplePrompts,
} from "@renderer/data/initial-prompts";
import { initialPromptCategories } from "@renderer/data/initital-prompt-categories";
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
  DBStore,
  Message,
  Prompt,
  PromptCategory,
  User,
  UserConfig,
} from "@renderer/types";
import { getCreatedAt, schemaToString } from "@renderer/utils";
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

    this.promptCategories
      .count()
      .then((count) => count > 0)
      .then((hasInitialCategories) => {
        if (!hasInitialCategories) {
          const categories = initialPromptCategories;
          categories.forEach((category) => {
            this.promptCategories.add({
              ...category,
              createdAt: getCreatedAt(),
            } as PromptCategory);
          });
        }
      })
      .then(() => {
        this.promptCategories
          .where("title")
          .equals("System")
          .first()
          .then((systemCategory) => {
            this.prompts
              .count()
              .then((count) => count > 0)
              .then((hasInitialPrompts) => {
                if (!hasInitialPrompts) {
                  const simplePrompts = initialSimplePrompts.map((prompt) => ({
                    ...prompt,
                    categoryId: systemCategory?.id,
                  }));

                  const complexPrompts = initialComplexPrompts.map(
                    (prompt) => ({
                      ...prompt,
                      categoryId: systemCategory?.id,
                    })
                  );

                  const prompts = [...complexPrompts, ...simplePrompts];

                  prompts.forEach((prompt) => {
                    this.prompts.add({
                      ...prompt,
                      createdAt: getCreatedAt(),
                    } as Prompt);
                  });
                }
              });
          });
      });
  }
}
