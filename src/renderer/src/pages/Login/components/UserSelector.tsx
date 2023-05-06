import { useCreateUser } from "@renderer/services/mutations/users";
import { useUsers } from "@renderer/services/queries/users";
import { userAtom } from "@renderer/state/users";
import { User } from "@renderer/types";
import { useSetAtom } from "jotai/react";
import { FC } from "react";
import { useForm } from "react-hook-form";

export const UserSelector: FC = () => {
  const { data: users, isLoading } = useUsers();
  const { register, handleSubmit } = useForm<User>();
  const setUser = useSetAtom(userAtom);
  const mutation = useCreateUser();

  const onSubmit = (data: User) => {
    mutation.mutate(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} />
        <button type="submit">Create user</button>
      </form>
      <ul>
        {isLoading && <li>Loading...</li>}
        {users?.map((user) => (
          <li key={user.id} onClick={() => setUser(user)}>
            {user.name}
          </li>
        ))}
      </ul>
    </>
  );
};
