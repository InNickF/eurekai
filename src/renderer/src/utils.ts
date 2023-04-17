import { z } from "zod";

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
