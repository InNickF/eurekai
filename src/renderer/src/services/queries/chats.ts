import { Chat, User } from "@renderer/types";
import { useQuery } from "@tanstack/react-query";
import { getChats } from "../api/chats";
import { queryKeys } from "../keys";

export const useChats = () => {
  return useQuery({
    keepPreviousData: true,
    ...queryKeys.chats.all,
    queryFn: getChats,
  });
};

interface UseChatArgs {
  chatId: Chat["id"];
  onError?: (error: unknown) => void;
}
export const useChat = ({ chatId, onError }: UseChatArgs) => {
  return useQuery({
    ...queryKeys.chats.detail(chatId),
    onError(error) {
      onError?.(error);
    },
    enabled: !!chatId,
  });
};

interface UseChatByUserIdArgs {
  userId: User["id"];
  onError?: (error: unknown) => void;
}
export const useChatByUserId = ({ userId, onError }: UseChatByUserIdArgs) => {
  return useQuery({
    ...queryKeys.chats.detailByUserId(userId),
    onError(error) {
      onError?.(error);
    },
    enabled: !!userId,
  });
};

interface UseChatsByUserIdArgs {
  userId: User["id"];
  onError?: (error: unknown) => void;
}
export const useChatsByUserId = ({ userId, onError }: UseChatsByUserIdArgs) => {
  return useQuery({
    ...queryKeys.chats.allByUserId(userId),
    onError(error) {
      onError?.(error);
    },
    enabled: !!userId,
  });
};
