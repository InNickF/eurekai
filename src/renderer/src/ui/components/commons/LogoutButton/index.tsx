import { clearUserSession } from "@renderer/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logout = () => {
    clearUserSession();
    queryClient.clear();
    navigate("/login");
  };

  return <button onClick={logout}>Logout</button>;
};
