import { useMe } from "@renderer/services/queries/users";
import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

export const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  const { data: user, isLoading } = useMe();

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return !user ? <Navigate to="/login" /> : <>{children}</>;
};
