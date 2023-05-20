import {
  CHAT_COMPLETION_MODELS,
  CHAT_TYPES,
  MESSAGE_ROLES,
  PROMPT_TYPES,
} from "@renderer/utils";
import { z } from "zod";

export const ChatTypeSchema = z.enum(CHAT_TYPES);
export const MessageRoleSchema = z.enum(MESSAGE_ROLES);
export const PromptTypeSchema = z.enum(PROMPT_TYPES);
export const IdSchema = z.number();
export const CreatedAtSchema = z.object({
  createdAt: z.date(),
});
export const UpdatedAtSchema = z.object({
  updatedAt: z.date(),
});
export const ChatCompletionModelsSchema = z.enum(CHAT_COMPLETION_MODELS);

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
  title: z.string().nullable(),
  description: z.string().nullable(),
  context: z.string().nullable(),
  speakersQuantity: z.number().nullable(),
  systemMessage: z.string().nullable(),
  serializedData: z.string().nullable(),
  sourceFileName: z.string().nullable(),
  initialized: z.boolean().nullable(),
  type: ChatTypeSchema,
});

export const ChatSchema = z
  .object({
    id: IdSchema,
  })
  .merge(ChatPayloadSchema)
  .merge(CreatedAtSchema)
  .merge(UpdatedAtSchema);

export const MessagePayloadSchema = z.object({
  userId: UserSchema.shape.id,
  chatId: ChatSchema.shape.id,
  visible: z.boolean().nullish(),
  content: z.string(),
  role: MessageRoleSchema,
});

export const MessageSchema = z
  .object({
    id: IdSchema,
  })
  .merge(MessagePayloadSchema)
  .merge(CreatedAtSchema);

export const ChatWithMessagesSchema = ChatSchema.merge(
  z.object({
    messages: z.array(MessageSchema),
  })
);

export const PromptCategoryPayloadSchema = z.object({
  userId: UserSchema.shape.id.nullable(),
  title: z.string(),
  description: z.string().nullable(),
});

export const PromptCategorySchema = z
  .object({
    id: IdSchema,
  })
  .merge(PromptCategoryPayloadSchema)
  .merge(CreatedAtSchema);

export const PromptPayloadSchema = z.object({
  userId: UserSchema.shape.id.nullable(),
  categoryId: PromptCategorySchema.shape.id.nullable(),
  title: z.string().nullable(),
  content: z.string(),
  type: PromptTypeSchema,
});

export const PromptSchema = z
  .object({
    id: IdSchema,
  })
  .merge(PromptPayloadSchema)
  .merge(CreatedAtSchema);

// The session is in the renderer side.
// export const ConfigSchema = z.object({
//   id: IdSchema.nullish(),
//   currentUserId: UserSchema.shape.id.nullable(),
// });

export const UserConfigPayloadSchema = z.object({
  userId: UserSchema.shape.id,
  apiKey: z.string().nullable(),
});

export const UserConfigSchema = z
  .object({
    id: IdSchema,
  })
  .merge(UserConfigPayloadSchema);

export const UserWithConfigSchema = UserSchema.merge(
  z.object({
    config: UserConfigSchema,
  })
);

export const OpenAITranscriptionPayloadSchema = z.object({
  audio: z.instanceof(File),
  openAIKey: z.string(),
});

export const OpenAITranscriptionResponseSchema = z.object({
  text: z.string(),
});

export const OpenAIMessageSchema = z.object({
  role: MessageRoleSchema,
  content: z.string(),
  name: z.string().nullish(),
});

export const OpenAIMessagesSchema = z.array(OpenAIMessageSchema);

export const OpenAICompletionExtraOptionsPayloadSchema = z.object({
  temperature: z.number().nullish(),
  n: z.number().nullish(),
  max_tokens: z.number().nullish(),
  presence_penalty: z.number().nullish(),
  frequency_penalty: z.number().nullish(),
  stop: z.array(z.string()).nullish(),
});

export const OpenAICompletionPayloadSchema = z
  .object({
    model: ChatCompletionModelsSchema,
    messages: OpenAIMessagesSchema,
  })
  .merge(OpenAICompletionExtraOptionsPayloadSchema);

export const OpenAICompletionResponseSchema = z.object({
  id: z.string(),
  object: z.string(),
  created: z.number(),
  choices: z.array(
    z.object({
      index: z.number(),
      message: z.object({
        role: z.literal(MessageRoleSchema.enum.assistant),
        content: z.string(),
      }),
      finish_reason: z.string().nullish(),
    })
  ),
  usage: z.object({
    prompt_tokens: z.number(),
    completion_tokens: z.number(),
    total_tokens: z.number(),
  }),
});
