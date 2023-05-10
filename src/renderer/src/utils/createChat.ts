import { ChatRepository } from "@renderer/repositories/chat";
import { ChatPayload, Prompt } from "@renderer/types";
import { getSystemMessage } from "./system-message";

interface CreateChatArgs {
  chat: ChatPayload;
  initialPrompt: Prompt;
}
export const createChat = async ({ chat, initialPrompt }: CreateChatArgs) => {
  const chatRepository = new ChatRepository();

  const systemMessage = getSystemMessage({
    context: chat.context,
    speakersQuantity: chat.speakersQuantity,
  });
  // WIP
  const currentChat = await chatRepository.addChat({
    ...chat,
    systemMessage,
    initialized: false,
  });
};
