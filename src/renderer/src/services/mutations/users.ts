import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../api/users";
import { queryKeys } from "../keys";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSettled() {
      queryClient.invalidateQueries(queryKeys.users.all._def);
    },
  });
};
