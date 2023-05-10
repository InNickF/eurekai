import { createQueryKeys } from "@lukemorales/query-key-factory";
import { User, Chat } from "@renderer/types";
import { getChat, getChatByUserId, getChatsByUserId } from "../api/chats";

export const chats = createQueryKeys("chats", {
  all: null,
  detail: (chatId: Chat["id"]) => ({
    queryKey: [chatId],
    queryFn: () => getChat(chatId),
  }),
  detailByUserId: (userId: User["id"]) => ({
    queryKey: [userId],
    queryFn: () => getChatByUserId(userId),
  }),
  allByUserId: (userId: User["id"]) => ({
    queryKey: [userId],
    queryFn: () => getChatsByUserId(userId),
  }),
});
