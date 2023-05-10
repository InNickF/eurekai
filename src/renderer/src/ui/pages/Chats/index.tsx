import { useChatsByUserId } from "@renderer/services/queries/chats";
import { useMe } from "@renderer/services/queries/users";
import { Page } from "@renderer/types";
import { AppLayout } from "@renderer/ui/components/layout/AppLayout";
import { FC } from "react";
import { Link } from "react-router-dom";

export const ChatsPage: Page<FC> = () => {
  const { data: user, isLoading: isLoadingUser } = useMe();
  const { data: chats, isLoading: isLoadingChats } = useChatsByUserId({
    userId: user?.id!,
  });
  const isLoading = isLoadingUser || isLoadingChats;
  const hasChats = chats && chats.length > 0;

  return (
    <>
      <h1 className="mb-8">Chats</h1>
      {isLoading ? <p>loading...</p> : null}

      {hasChats && !isLoading ? (
        chats?.map((chat) => (
          <div key={chat.id} className="mb-4">
            <p>{chat.title || chat.context || "Untitled chat"}</p>
            <Link to={`/chats/${chat.id}`}>Go to chat</Link>
          </div>
        ))
      ) : (
        <p>No chats</p>
      )}
    </>
  );
};

ChatsPage.layout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};
