import { useUpdateUserConfigMutation } from "@renderer/services/mutations/user-configs";
import { useUpdateUserMutation } from "@renderer/services/mutations/users";
import { User, UserConfig, UserWithConfig } from "@renderer/types";
import { FC } from "react";
import { useForm } from "react-hook-form";

interface ConfigForm {
  name: User["name"];
  apiKey: UserConfig["apiKey"];
}

interface UserConfigEditorProps {
  user: UserWithConfig;
}

export const UserConfigEditor: FC<UserConfigEditorProps> = ({ user }) => {
  const { register, handleSubmit } = useForm<ConfigForm>({
    defaultValues: {
      name: user.name,
      apiKey: user.config.apiKey,
    },
  });

  const userMutation = useUpdateUserMutation();
  const configMutation = useUpdateUserConfigMutation();

  const onSubmit = (data: ConfigForm) => {
    userMutation.mutate({
      id: user.id,
      name: data.name,
    });
    configMutation.mutate({
      apiKey: data.apiKey,
      id: user.config.id,
      userId: user.id,
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
