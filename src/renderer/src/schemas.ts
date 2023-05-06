import { z } from "zod";
import { CHAT_TYPES, MESSAGE_ROLES } from "./utils";

export const ChatTypeSchema = z.enum(CHAT_TYPES);
export const MessageRoleSchema = z.enum(MESSAGE_ROLES);
export const IdSchema = z.number();

export const UserPayloadSchema = z.object({
  name: z.string(),
});

export const UserSchema = z
  .object({
    id: IdSchema,
  })
  .merge(UserPayloadSchema);

export const ChatPayloadSchema = z.object({
  userId: UserSchema.shape.id,
  systemMessage: z.string().optional(),
  serializedData: z.string().optional(),
  type: ChatTypeSchema,
});

export const ChatSchema = z
  .object({
    id: IdSchema,
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .merge(ChatPayloadSchema);

export const MessagePayloadSchema = z.object({
  userId: UserSchema.shape.id,
  chatId: ChatSchema.shape.id,
  content: z.string(),
  role: MessageRoleSchema,
});

export const MessageSchema = z
  .object({
    id: IdSchema,
    createdAt: z.date(),
  })
  .merge(MessagePayloadSchema);

export const PromptCategoryPayloadSchema = z.object({
  userId: UserSchema.shape.id,
  label: z.string(),
  description: z.string().optional(),
});

export const PromptCategorySchema = z
  .object({
    id: IdSchema,
    createdAt: z.date(),
  })
  .merge(PromptCategoryPayloadSchema);

export const PromptPayloadSchema = z.object({
  userId: UserSchema.shape.id,
  categoryId: PromptCategorySchema.shape.id.optional(),
  label: z.string(),
  content: z.string(),
});

export const PromptSchema = z
  .object({
    id: IdSchema,
  })
  .merge(PromptPayloadSchema);

// The session is in the renderer side.
// export const ConfigSchema = z.object({
//   id: IdSchema.nullish(),
//   currentUserId: UserSchema.shape.id.optional(),
// });

export const UserConfigPayloadSchema = z.object({
  userId: UserSchema.shape.id,
  apiKey: z.string().optional(),
});

export const UserConfigSchema = z
  .object({
    id: IdSchema,
  })
  .merge(UserConfigPayloadSchema);
