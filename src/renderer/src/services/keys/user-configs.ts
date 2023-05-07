import { createQueryKeys } from "@lukemorales/query-key-factory";
import { User, UserConfig } from "@renderer/types";
import { getUserConfig, getUserConfigByUserId } from "../api/user-configs";

export const userConfigs = createQueryKeys("userConfigs", {
  all: null,
  detail: (configId: UserConfig["id"]) => ({
    queryKey: [configId],
    queryFn: () => getUserConfig(configId),
  }),
  detailByUserId: (userId: User["id"]) => ({
    queryKey: [userId],
    queryFn: () => getUserConfigByUserId(userId),
  }),
});
