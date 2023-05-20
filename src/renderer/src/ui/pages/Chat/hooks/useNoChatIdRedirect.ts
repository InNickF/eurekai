import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const useNoChatIdRedirect = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!chatId || chatId === ":chatId") {
      navigate("/chats");
    }
  }, []);
};
