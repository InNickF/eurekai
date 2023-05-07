import { UserRepository } from "@renderer/repositories/user";
import { UserSchema } from "@renderer/schemas";
import { User, UserPayload } from "@renderer/types";
import { getUserSession } from "@renderer/utils";
import { z } from "zod";

export const getUsers = async () => {
  const userRepository = new UserRepository();
  const response = await userRepository.getAllUsers();
  return z.array(UserSchema).parse(response);
};

export const getUser = async (userId: User["id"]) => {
  const userRepository = new UserRepository();
  const response = await userRepository.getUserById(userId);
  return UserSchema.parse(response);
};
export const getMe = async () => {
  const userId = getUserSession();
  const userRepository = new UserRepository();
  const response = await userRepository.getUserById(userId);
  return UserSchema.parse(response);
};

export const createUser = async (user: UserPayload) => {
  const userRepository = new UserRepository();
  const response = await userRepository.addUser(user);
  return UserSchema.parse(response);
};

export const updateUser = async (user: User) => {
  const userRepository = new UserRepository();
  const response = await userRepository.updateUser(user);
  return UserSchema.parse(response);
};

export const deleteUser = async (user: User) => {
  const userRepository = new UserRepository();
  await userRepository.deleteUser(user);
  return "User deleted successfully.";
};
