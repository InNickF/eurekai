import { Id } from "@renderer/types";
import { useQuery } from "@tanstack/react-query";
import { getMe, getUsers } from "../api/users";
import { queryKeys } from "../keys";

export const useUsers = () => {
  return useQuery({
    keepPreviousData: true,
    ...queryKeys.users.all,
    queryFn: getUsers,
  });
};

export const useUser = (userId: Id) => {
  return useQuery({
    ...queryKeys.users.detail(userId),
  });
};

export const useMe = () => {
  return useQuery({
    ...queryKeys.users.me,
    queryFn: getMe,
    staleTime: Infinity,
    keepPreviousData: true,
    retry: false,
  });
};
