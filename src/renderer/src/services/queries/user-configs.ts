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

export const useUserConfig = (configId: UserConfig["id"]) => {
  return useQuery({
    ...queryKeys.userConfigs.detail(configId),
    enabled: !!configId,
  });
};

export const useUserConfigByUserId = (userId: User["id"]) => {
  return useQuery({
    ...queryKeys.userConfigs.detailByUserId(userId),
    enabled: !!userId,
  });
};
