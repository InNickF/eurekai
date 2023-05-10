import { queryKeys } from "@renderer/services/keys";
import { useQueryClient } from "@tanstack/react-query";
import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

export const LoginLayout: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData(queryKeys.users.me.queryKey);

  if (userData) {
    return <Navigate to="/" />;
  }

  return (
    <section className="grid place-content-center h-screen entrance-animation">
      {children}
    </section>
  );
};
