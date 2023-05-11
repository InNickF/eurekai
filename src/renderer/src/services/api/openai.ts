import {
  OpenAICompletionPayloadSchema,
  OpenAICompletionResponseSchema,
} from "@renderer/schemas";
import {
  ChatCompletionModels,
  OpenAICompletionExtraOptionsPayload,
  OpenAICompletionPayload,
  OpenAIMessages,
} from "@renderer/types";

export const getAudioTranscription = async (audio: File, openAIKey: string) => {
  const formData = new FormData();
  formData.append("file", audio);
  formData.append("model", "whisper-1");

  const response = await fetch(
    "https://api.openai.com/v1/audio/transcriptions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openAIKey}`,
      },
      body: formData,
    }
  );
  const data = await response.json();
  return data;
};

interface GetChatCompletionArgs {
  model?: ChatCompletionModels;
  messages: OpenAIMessages;
  options?: OpenAICompletionExtraOptionsPayload;
}
export const getChatCompletion = async ({
  messages,
  model = "gpt-3.5-turbo",
  options = {},
}: GetChatCompletionArgs) => {
  const payload: OpenAICompletionPayload = {
    messages,
    model,
    ...options,
  };

  const parsedPayload = OpenAICompletionPayloadSchema.parse(payload);

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify(parsedPayload),
  });
  const data = await response.json();

  return OpenAICompletionResponseSchema.parse(data);
};
