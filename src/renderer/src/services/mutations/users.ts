import { User } from "@renderer/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, deleteUser, updateUser } from "../api/users";
import { queryKeys } from "../keys";

export const useCreateUser = ({
  onSuccess,
}: { onSuccess?: (user: User) => void } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSettled() {
      queryClient.invalidateQueries(queryKeys.users.all);
    },
    onSuccess(data) {
      onSuccess?.(data);
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess(data) {
      queryClient.invalidateQueries(queryKeys.users.detail(data.id));
      queryClient.invalidateQueries(queryKeys.users.me.queryKey);
    },
    onSettled() {
      queryClient.invalidateQueries(queryKeys.users.all);
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess(_data, context) {
      queryClient.invalidateQueries(queryKeys.users.detail(context.id));
    },
    onSettled() {
      queryClient.invalidateQueries(queryKeys.users.all);
    },
  });
};
