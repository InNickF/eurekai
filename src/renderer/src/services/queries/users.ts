import { User } from "@renderer/types";
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

interface UseUserArgs {
  userId: User["id"];
  onError?: (error: unknown) => void;
}
export const useUser = ({ userId, onError }: UseUserArgs) => {
  return useQuery({
    ...queryKeys.users.detail(userId),
    onError(error) {
      onError?.(error);
    },
    enabled: !!userId,
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
