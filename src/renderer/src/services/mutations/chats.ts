import { initializeChat } from "@renderer/utils/chatAndMessages";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../keys";

export const useInitializeChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: initializeChat,
    onSuccess(data) {
      queryClient.invalidateQueries(queryKeys.chats.detail(data.id));
    },
    onSettled() {
      queryClient.invalidateQueries(queryKeys.chats._def);
    },
  });
};
