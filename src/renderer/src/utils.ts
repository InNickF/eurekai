import { z } from "zod";
import { User } from "./types";

export const CHAT_TYPES = ["vanilla", "text", "audio", "video"] as const;
export const MESSAGE_ROLES = ["user", "assistant", "system"] as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const schemaToString = (schema: z.ZodObject<any>): string => {
  return Object.keys(schema.shape)
    .map((key) => {
      return key === "id" ? `++${key}` : key;
    })
    .join(",");
};

export const setUserSession = (userId: User["id"]) => {
  localStorage.setItem("userId", `${userId}`);
};

export const getUserSession = () => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    throw new AuthError();
  }
  return Number(userId);
};

export const clearUserSession = () => {
  localStorage.removeItem("userId");
};

export class AuthError extends Error {
  constructor() {
    super("Not authenticated.");
  }
}
