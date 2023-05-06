import { Navbar } from "@renderer/components/layout/Navbar";
import { FC, PropsWithChildren } from "react";
import { AuthLayout } from "../AuthLayout";
import { AppContainer } from "./components/AppContainer";

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AuthLayout>
      <Navbar />
      <AppContainer>{children}</AppContainer>
    </AuthLayout>
  );
};
