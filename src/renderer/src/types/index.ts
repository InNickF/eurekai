import {
  ChatCompletionModelsSchema,
  ChatPayloadSchema,
  ChatSchema,
  ChatTypeSchema,
  ChatWithMessagesSchema,
  CreatedAtSchema,
  IdSchema,
  MessagePayloadSchema,
  MessageRoleSchema,
  MessageSchema,
  OpenAICompletionExtraOptionsPayloadSchema,
  OpenAICompletionPayloadSchema,
  OpenAICompletionResponseSchema,
  OpenAIMessageSchema,
  OpenAIMessagesSchema,
  OpenAITranscriptionPayloadSchema,
  OpenAITranscriptionResponseSchema,
  PromptCategoryPayloadSchema,
  PromptCategorySchema,
  PromptPayloadSchema,
  PromptSchema,
  UpdatedAtSchema,
  UserConfigPayloadSchema,
  UserConfigSchema,
  UserPayloadSchema,
  UserSchema,
  UserWithConfigSchema,
} from "@renderer/schemas";
import { z } from "zod";

export type DBStore = {
  [key: string]: string;
};

export type Id = z.infer<typeof IdSchema>;
export type ChatType = z.infer<typeof ChatTypeSchema>;
export type MessageRole = z.infer<typeof MessageRoleSchema>;

export type CreatedAt = z.infer<typeof CreatedAtSchema>;
export type UpdatedAt = z.infer<typeof UpdatedAtSchema>;

// DB Models and it's payloads
export type Chat = z.infer<typeof ChatSchema>;
export type ChatPayload = z.infer<typeof ChatPayloadSchema>;

export type Message = z.infer<typeof MessageSchema>;
export type MessagePayload = z.infer<typeof MessagePayloadSchema>;

export type PromptCategory = z.infer<typeof PromptCategorySchema>;
export type PromptCategoryPayload = z.infer<typeof PromptCategoryPayloadSchema>;

export type Prompt = z.infer<typeof PromptSchema>;
export type PromptPayload = z.infer<typeof PromptPayloadSchema>;

export type UserConfig = z.infer<typeof UserConfigSchema>;
export type UserConfigPayload = z.infer<typeof UserConfigPayloadSchema>;

export type User = z.infer<typeof UserSchema>;
export type UserWithConfig = z.infer<typeof UserWithConfigSchema>;
export type UserPayload = z.infer<typeof UserPayloadSchema>;

// export type Config = z.infer<typeof ConfigSchema>;

// END DB Models and it's payloads

export type ChatWithMessages = z.infer<typeof ChatWithMessagesSchema>;

export type Layout = (
  page: React.ReactElement<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    string | React.JSXElementConstructor<any>
  > | null
) => React.ReactNode;

export type Page<T> = T & {
  layout?: Layout;
};

export type OpenAITranscriptionPayload = z.infer<
  typeof OpenAITranscriptionPayloadSchema
>;

export type OpenAITranscriptionResponse = z.infer<
  typeof OpenAITranscriptionResponseSchema
>;

export type ChatCompletionModels = z.infer<typeof ChatCompletionModelsSchema>;
export type OpenAIMessage = z.infer<typeof OpenAIMessageSchema>;
export type OpenAIMessages = z.infer<typeof OpenAIMessagesSchema>;
export type OpenAICompletionExtraOptionsPayload = z.infer<
  typeof OpenAICompletionExtraOptionsPayloadSchema
>;
export type OpenAICompletionPayload = z.infer<
  typeof OpenAICompletionPayloadSchema
>;
export type OpenAICompletionResponse = z.infer<
  typeof OpenAICompletionResponseSchema
>;
