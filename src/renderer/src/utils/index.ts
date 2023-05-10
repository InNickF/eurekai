import { z } from "zod";
import { User } from "@renderer/types";

export const CHAT_TYPES = ["vanilla", "text", "audio", "video"] as const;
export const MESSAGE_ROLES = ["user", "assistant", "system"] as const;
export const PROMPT_TYPES = ["user", "system"] as const;

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

export const splitText = (text: string, limit = 3000) => {
  const chunks: string[] = [];
  for (let i = 0; i < text.length; i += limit) {
    chunks.push(text.substring(i, i + limit));
  }
  return chunks;
};
