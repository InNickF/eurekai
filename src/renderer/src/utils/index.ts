import { CreatedAt, UpdatedAt, User } from "@renderer/types";
import { z } from "zod";

export const CHAT_TYPES = ["vanilla", "text", "audio", "video"] as const;
export const MESSAGE_ROLES = ["user", "assistant", "system"] as const;
export const PROMPT_TYPES = ["user", "system"] as const;
export const CHAT_COMPLETION_MODELS = [
  "gpt-3.5-turbo",
  "gpt-4",
  "gpt-4-32k",
] as const;

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

export const splitText = ({
  text,
  limit = 1000,
}: {
  text?: string | null;
  limit?: number;
}) => {
  if (!text) return [];
  if (text.length < limit) return [text];

  const chunks: string[] = [];
  for (let i = 0; i < text.length; i += limit) {
    chunks.push(text.substring(i, i + limit));
  }
  return chunks;
};

export const getCreatedAt = () => {
  return new Date();
};

export const orderByCreatedAt = <T extends CreatedAt>(items: T[]) => {
  return items.sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
};

export const getUpdatedAt = () => {
  return new Date();
};

export const orderByUpdatedAt = <T extends UpdatedAt>(items: T[]) => {
  return items.sort((a, b) => {
    return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
  });
};

export const notFoundErrorMessage = "Not found.";

export class NotFoundError extends Error {
  constructor() {
    super(notFoundErrorMessage);
  }
}
