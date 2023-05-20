import { useMe } from "@renderer/services/queries/users";
import { Page } from "@renderer/types";
import { AppLayout } from "@renderer/ui/components/layout/AppLayout";
import { FC } from "react";
import { UserConfigEditor } from "./components/UserConfigEditor";

export const ConfigPage: Page<FC> = () => {
  const { data: user, isLoading } = useMe();
  return (
    <section>
      <h1>Config</h1>
      <p>Logged in as {user?.name}</p>

      {!isLoading && user ? (
        <UserConfigEditor user={user} />
      ) : (
        <p>No config found</p>
      )}
    </section>
  );
};

ConfigPage.layout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};
