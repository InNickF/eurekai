import { queryKeys } from "@renderer/services/keys";
import {
  useCreateUser,
  useDeleteUser,
} from "@renderer/services/mutations/users";
import { useUsers } from "@renderer/services/queries/users";
import { User } from "@renderer/types";
import { setUserSession } from "@renderer/utils";
import { QueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const UserSelector: FC = () => {
  const { data: users, isLoading } = useUsers();

  const { register, handleSubmit, reset } = useForm<User>();
  const queryClient = new QueryClient();
  const navigate = useNavigate();

  const createUserMutation = useCreateUser({
    onSuccess: (user) => {
      reset();
      onSelect(user);
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
    setUserSession(user.id);
    queryClient.setQueryData(queryKeys.users.me.queryKey, user);
    navigate("/");
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
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        go to home
      </button>
    </>
  );
};
