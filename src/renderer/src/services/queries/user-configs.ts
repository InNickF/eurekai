import { User, UserConfig } from "@renderer/types";
import { useQuery } from "@tanstack/react-query";
import { getAllUserConfigs } from "../api/user-configs";
import { queryKeys } from "../keys";

export const useUserConfigs = () => {
  return useQuery({
    keepPreviousData: true,
    ...queryKeys.userConfigs.all,
    queryFn: getAllUserConfigs,
  });
};
interface UseUserConfigArgs {
  userConfigId: UserConfig["id"];
  onError?: (error: unknown) => void;
}
export const useUserConfig = ({ userConfigId, onError }: UseUserConfigArgs) => {
  return useQuery({
    ...queryKeys.userConfigs.detail(userConfigId),
    onError(error) {
      onError?.(error);
    },
    enabled: !!userConfigId,
  });
};

interface UseUserConfigByUserIdArgs {
  userId: User["id"];
  onError?: (error: unknown) => void;
}
export const useUserConfigByUserId = ({
  userId,
  onError,
}: UseUserConfigByUserIdArgs) => {
  return useQuery({
    ...queryKeys.userConfigs.detailByUserId(userId),
    onError(error) {
      onError?.(error);
    },
    enabled: !!userId,
  });
};
