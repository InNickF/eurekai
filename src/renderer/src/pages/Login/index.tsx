import { LoginLayout } from "@renderer/components/layout/LoginLayout";
import { Page } from "@renderer/types";
import { FC } from "react";
import { UserSelector } from "./components/UserSelector";

export const LoginPage: Page<FC> = () => {
  return <UserSelector />;
};

LoginPage.layout = (page) => {
  return <LoginLayout>{page}</LoginLayout>;
};
