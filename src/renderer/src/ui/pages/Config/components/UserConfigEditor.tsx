import { useUpdateUserConfigMutation } from "@renderer/services/mutations/user-configs";
import { useUpdateUserMutation } from "@renderer/services/mutations/users";
import { User, UserConfig } from "@renderer/types";
import { FC } from "react";
import { useForm } from "react-hook-form";

interface ConfigForm {
  name: User["name"];
  apiKey: UserConfig["apiKey"];
}

interface UserConfigEditorProps {
  user: User;
  config: UserConfig;
}

export const UserConfigEditor: FC<UserConfigEditorProps> = ({
  user,
  config,
}) => {
  const { register, handleSubmit } = useForm<ConfigForm>({
    defaultValues: {
      name: user.name,
      apiKey: config.apiKey,
    },
  });

  const userMutation = useUpdateUserMutation();
  const configMutation = useUpdateUserConfigMutation();

  const onSubmit = (data: ConfigForm) => {
    userMutation.mutate({
      ...user,
      name: data.name,
    });
    configMutation.mutate({
      ...config,
      apiKey: data.apiKey,
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name</label>
      <input {...register("name", { required: true })} />

      <label htmlFor="apiKey">API Key</label>
      <input {...register("apiKey")} />
      <button type="submit">Save</button>
    </form>
  );
};
