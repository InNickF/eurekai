import { createQueryKeys } from "@lukemorales/query-key-factory";
import { User, Prompt } from "@renderer/types";
import {
  getPrompt,
  getPromptByUserId,
  getPromptsByUserId,
} from "../api/prompt";

export const prompts = createQueryKeys("prompts", {
  all: null,
  detail: (promptId: Prompt["id"]) => ({
    queryKey: [promptId],
    queryFn: () => getPrompt(promptId),
  }),
  detailByUserId: (userId: User["id"]) => ({
    queryKey: [userId],
    queryFn: () => getPromptByUserId(userId),
  }),
  allByUserId: (userId: User["id"]) => ({
    queryKey: [userId],
    queryFn: () => getPromptsByUserId(userId),
  }),
});
