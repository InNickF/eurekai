import { userAtom } from "@renderer/state/users";
import { useAtom } from "jotai";
import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

export const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  const [user] = useAtom(userAtom);
  return user ? <>{children}</> : <Navigate to="/login" />;
};
