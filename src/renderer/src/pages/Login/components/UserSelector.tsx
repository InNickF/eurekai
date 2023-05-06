import {
  useCreateUser,
  useDeleteUser,
} from "@renderer/services/mutations/users";
import { useUsers } from "@renderer/services/queries/users";
import { userAtom } from "@renderer/state/users";
import { User } from "@renderer/types";
import { useSetAtom } from "jotai/react";
import { FC } from "react";
import { useForm } from "react-hook-form";

export const UserSelector: FC = () => {
  const { data: users, isLoading } = useUsers();
  const { register, handleSubmit, reset } = useForm<User>();
  const setUser = useSetAtom(userAtom);
  const createUserMutation = useCreateUser({
    onSuccess: () => {
      reset();
    },
  });

  const deleteUserMutation = useDeleteUser();
  const onSubmit = (data: User) => {
    createUserMutation.mutate(data);
  };

  const onDelete = (user: User) => {
    deleteUserMutation.mutate(user);
  };

  const onSelect = (user: User) => {
    setUser(user);
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
          <li key={user.id}>
            <button onClick={() => onSelect(user)}>{user.name}</button>{" "}
            <button onClick={() => onDelete(user)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};
