import { AppLayout } from "@renderer/components/layout/AppLayout";
import { useUserConfigByUserId } from "@renderer/services/queries/user-configs";
import { useMe } from "@renderer/services/queries/users";
import { Page } from "@renderer/types";
import { FC } from "react";
import { UserConfigEditor } from "./components/UserConfigEditor";

export const ConfigPage: Page<FC> = () => {
  const { data: user, isLoading: isLoadingUser } = useMe();
  const { data: config, isLoading: isLoadingConfig } = useUserConfigByUserId(
    user?.id!
  );
  const isLoading = isLoadingUser && isLoadingConfig;
  return (
    <section>
      <h1>Config</h1>
      <p>Logged in as {user?.name}</p>

      {!isLoading && user && config ? (
        <UserConfigEditor user={user} config={config} />
      ) : (
        <p>No config found</p>
      )}
    </section>
  );
};

ConfigPage.layout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};
