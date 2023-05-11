import {
  Chat,
  Message,
  MessagePayload,
  OpenAICompletionResponse,
  OpenAIMessage,
  OpenAIMessages,
  User,
} from "@renderer/types";

interface OpenAICompletionToMessageArgs {
  openAICompletion: OpenAICompletionResponse;
  chatId: Chat["id"];
  userId: User["id"];
}
export const openAICompletionToMessage = ({
  chatId,
  userId,
  openAICompletion,
}: OpenAICompletionToMessageArgs): MessagePayload => {
  const { choices } = openAICompletion;
  const { message } = choices[0];
  return {
    chatId,
    userId,
    content: message.content,
    role: "assistant",
    visible: true,
  };
};

interface ChatMessagesToOpenAICompletionPayloadArgs {
  messages: Message[];
  user?: User;
}
export const chatMessagesToOpenAICompletionPayload = ({
  messages,
  user,
}: ChatMessagesToOpenAICompletionPayloadArgs): OpenAIMessages => {
  return messages.map((message) => {
    const messagePayload: OpenAIMessage = {
      role: message.role,
      content: message.content,
    };

    if (user && message.userId === user.id) {
      return { ...messagePayload, name: user.name };
    }

    return messagePayload;
  });
};
