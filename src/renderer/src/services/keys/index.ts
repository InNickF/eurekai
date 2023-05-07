import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { users } from "./users";
import { userConfigs } from "./user-configs";

export const queryKeys = mergeQueryKeys(users, userConfigs);
