import { useSetAtom } from "jotai/react";
import { userAtom } from "@renderer/state/users";

export const LogoutButton = () => {
  const setUser = useSetAtom(userAtom);
  const logout = () => setUser(null);

  return <button onClick={logout}>Logout</button>;
};
