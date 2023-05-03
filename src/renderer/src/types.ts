import { z } from "zod";
import {
  ChatSchema,
  ChatTypeSchema,
  ConfigSchema,
  IdSchema,
  MessageRoleSchema,
  MessageSchema,
  PromptCategorySchema,
  PromptSchema,
  UserConfigSchema,
  UserSchema,
} from "./schemas";

export type Store = {
  [key: string]: string;
};

export type Id = z.infer<typeof IdSchema>;
export type ChatType = z.infer<typeof ChatTypeSchema>;
export type MessageRole = z.infer<typeof MessageRoleSchema>;
export type Chat = z.infer<typeof ChatSchema>;
export type Message = z.infer<typeof MessageSchema>;
export type PromptCategory = z.infer<typeof PromptCategorySchema>;
export type Prompt = z.infer<typeof PromptSchema>;
export type Config = z.infer<typeof ConfigSchema>;
export type UserConfig = z.infer<typeof UserConfigSchema>;
export type User = z.infer<typeof UserSchema>;
