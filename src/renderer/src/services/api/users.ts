import { DB } from "@renderer/repositories";
import { UserSchema } from "@renderer/schemas";
import { Id, User } from "@renderer/types";
import { z } from "zod";

export const getUsers = async () => {
  const db = new DB();
  const response = await db.users.toArray();
  return z.array(UserSchema).parse(response);
};

export const getUser = async (userId: Id) => {
  const db = new DB();
  const response = await db.users.get(userId);
  return UserSchema.parse(response);
};

export const createUser = async (user: User) => {
  const db = new DB();
  return await db.users.add(user);
};
