import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { prompts } from "./prompts";
import { userConfigs } from "./user-configs";
import { chats } from "./chats";
import { users } from "./users";

export const queryKeys = mergeQueryKeys(users, userConfigs, prompts, chats);
