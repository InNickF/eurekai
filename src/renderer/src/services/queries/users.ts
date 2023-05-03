import { Id } from "@renderer/types";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/users";
import { queryKeys } from "../keys";

export const useUsers = () => {
  return useQuery({
    keepPreviousData: true,
    ...queryKeys.users.all,
    queryFn: () => getUsers(),
  });
};

export const useUser = (userId: Id) => {
  return useQuery({
    ...queryKeys.users.detail(userId),
  });
};
