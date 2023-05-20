import { ChatWithMessages, Message } from "@renderer/types";
import { getCreatedAt } from "@renderer/utils";
import { addNewUserMessage } from "@renderer/utils/chatAndMessages";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../keys";

export const useAddNewUserMessageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addNewUserMessage,
    onMutate(variables) {
      queryClient.setQueryData<ChatWithMessages>(
        queryKeys.chats.detail(variables.userMessage.chatId).queryKey,
        (old) => {
          if (old) {
            const newMessage: Message = {
              id: Math.random() * 1000,
              content: variables.userMessage.content,
              role: "user",
              visible: true,
              createdAt: getCreatedAt(),
              chatId: variables.userMessage.chatId,
              userId: variables.userMessage.userId,
            };
            old.messages.push(newMessage);
          }
          return old;
        }
      );
    },
    onSuccess(data) {
      queryClient.invalidateQueries(queryKeys.chats.detail(data.id));
    },
    onSettled() {
      queryClient.invalidateQueries(queryKeys.chats._def);
    },
  });
};
