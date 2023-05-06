import { LoginLayout } from "@renderer/components/layout/LoginLayout";
import { userAtom } from "@renderer/state/users";
import { Page } from "@renderer/types";
import { useAtom } from "jotai";
import { FC } from "react";
import { Navigate } from "react-router-dom";
import { UserSelector } from "./components/UserSelector";

export const LoginPage: Page<FC> = () => {
  return <UserSelector />;
};

LoginPage.layout = (page) => {
  const [user] = useAtom(userAtom);

  return user ? <Navigate to={"/"} /> : <LoginLayout>{page}</LoginLayout>;
};
