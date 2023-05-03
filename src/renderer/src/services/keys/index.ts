import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { users } from "./users";

export const queryKeys = mergeQueryKeys(users);
