import { UserConfig } from "@renderer/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserConfig } from "../api/user-configs";
import { queryKeys } from "../keys";

export const useUpdateUserConfigMutation = ({
  onSuccess,
}: { onSuccess?: (user: UserConfig) => void } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserConfig,
    onSettled() {
      queryClient.invalidateQueries(queryKeys.userConfigs._def);
    },
    onSuccess(data) {
      onSuccess?.(data);
    },
  });
};
