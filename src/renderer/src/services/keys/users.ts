import { createQueryKeys } from "@lukemorales/query-key-factory";
import { Id } from "@renderer/types";
import { getUser } from "../api/users";

export const users = createQueryKeys("users", {
  all: null,
  detail: (userId: Id) => ({
    queryKey: [userId],
    queryFn: () => getUser(userId),
  }),
});
