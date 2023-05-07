import { createQueryKeys } from "@lukemorales/query-key-factory";
import { User } from "@renderer/types";
import { getUser } from "../api/users";

export const users = createQueryKeys("users", {
  all: null,
  detail: (userId: User["id"]) => ({
    queryKey: [userId],
    queryFn: () => getUser(userId),
  }),
  me: null,
});
