import { useInitializeChat } from "@renderer/services/mutations/chats";
import { ChatWithMessages } from "@renderer/types";
import { useEffect, useRef } from "react";

interface UseInitializeChatOnMountArgs {
  chat: ChatWithMessages;
}
export const useInitializeChatOnMount = ({
  chat,
}: UseInitializeChatOnMountArgs) => {
  const initializeMutation = useInitializeChat();
  const firstRender = useRef(true);
  useEffect(() => {
    if (!chat) return;
    if (chat.initialized) return;
    if (firstRender.current) {
      initializeMutation.mutate({ chat });
      firstRender.current = false;
    }
  }, []);

  return initializeMutation;
};
