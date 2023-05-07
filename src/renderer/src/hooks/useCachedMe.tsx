import { queryKeys } from "@renderer/services/keys";
import { User } from "@renderer/types";
import { useQueryClient } from "@tanstack/react-query";

export const useCachedMe = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(queryKeys.users.me.queryKey);
  return user;
};
