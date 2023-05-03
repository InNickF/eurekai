import { z } from "zod";
import { CHAT_TYPES, MESSAGE_ROLES } from "./utils";

export const ChatTypeSchema = z.enum(CHAT_TYPES);
export const MessageRoleSchema = z.enum(MESSAGE_ROLES);
export const IdSchema = z.number();

export const UserSchema = z.object({
  id: IdSchema.nullish(),
  name: z.string(),
});

export const ChatSchema = z.object({
  id: IdSchema.nullish(),
  userId: UserSchema.shape.id,
  systemMessage: z.string().optional(),
  serializedData: z.string().optional(),
  type: ChatTypeSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const MessageSchema = z.object({
  id: IdSchema.nullish(),
  userId: UserSchema.shape.id,
  chatId: ChatSchema.shape.id,
  content: z.string(),
  role: MessageRoleSchema,
  createdAt: z.date(),
});

export const PromptCategorySchema = z.object({
  id: IdSchema.nullish(),
  userId: UserSchema.shape.id,
  label: z.string(),
  description: z.string().optional(),
  createdAt: z.date(),
});

export const PromptSchema = z.object({
  id: IdSchema.nullish(),
  userId: UserSchema.shape.id,
  categoryId: PromptCategorySchema.shape.id.optional(),
  label: z.string(),
  content: z.string(),
});

export const ConfigSchema = z.object({
  id: IdSchema.nullish(),
  currentUserId: UserSchema.shape.id.optional(),
});

export const UserConfigSchema = z.object({
  id: IdSchema.nullish(),
  userId: UserSchema.shape.id,
  apiKey: z.string().optional(),
});
