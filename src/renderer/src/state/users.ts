import { User } from "@renderer/types";
import { atomWithStorage } from "jotai/utils";

export const userAtom = atomWithStorage<User | null>("currentUser", null);
