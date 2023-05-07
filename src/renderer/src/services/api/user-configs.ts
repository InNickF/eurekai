import { UserConfigRepository } from "@renderer/repositories/user-config";
import { UserConfigSchema } from "@renderer/schemas";
import { User, UserConfig, UserConfigPayload } from "@renderer/types";

export const getAllUserConfigs = () => {
  const userConfigRepository = new UserConfigRepository();
  const response = userConfigRepository.getUserConfigs();
  return UserConfigSchema.parse(response);
};

export const getUserConfig = async (configId: UserConfig["id"]) => {
  const userConfigRepository = new UserConfigRepository();
  const response = await userConfigRepository.getUserConfigById(configId);
  return UserConfigSchema.parse(response);
};

export const getUserConfigByUserId = async (userId: User["id"]) => {
  const userConfigRepository = new UserConfigRepository();
  const response = await userConfigRepository.getUserConfigByUserId(userId);
  return UserConfigSchema.parse(response);
};

export const addUserConfig = async (userConfig: UserConfigPayload) => {
  const userConfigRepository = new UserConfigRepository();
  const response = await userConfigRepository.addUserConfig(userConfig);
  return UserConfigSchema.parse(response);
};

export const updateUserConfig = async (userConfig: UserConfig) => {
  const userConfigRepository = new UserConfigRepository();
  const response = await userConfigRepository.updateUserConfig(userConfig);
  return UserConfigSchema.parse(response);
};

export const deleteUserConfig = async (userConfigId: UserConfig["id"]) => {
  const userConfigRepository = new UserConfigRepository();
  const response = await userConfigRepository.deleteUserConfig(userConfigId);
  return UserConfigSchema.parse(response);
};
