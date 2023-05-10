import { User, Prompt } from "@renderer/types";
import { useQuery } from "@tanstack/react-query";
import { getPrompts } from "../api/prompt";
import { queryKeys } from "../keys";

export const usePrompts = () => {
  return useQuery({
    keepPreviousData: true,
    ...queryKeys.prompts.all,
    queryFn: getPrompts,
  });
};

interface UsePromptArgs {
  promptId: Prompt["id"];
  onError?: (error: unknown) => void;
}
export const usePrompt = ({ promptId, onError }: UsePromptArgs) => {
  return useQuery({
    ...queryKeys.prompts.detail(promptId),
    onError(error) {
      onError?.(error);
    },
    enabled: !!promptId,
  });
};

interface UsePromptByUserIdArgs {
  userId: User["id"];
  onError?: (error: unknown) => void;
}
export const usePromptByUserId = ({
  userId,
  onError,
}: UsePromptByUserIdArgs) => {
  return useQuery({
    ...queryKeys.prompts.detailByUserId(userId),
    onError(error) {
      onError?.(error);
    },
    enabled: !!userId,
  });
};

interface UsePromptsByUserIdArgs {
  userId: User["id"];
  onError?: (error: unknown) => void;
}
export const usePromptsByUserId = ({
  userId,
  onError,
}: UsePromptsByUserIdArgs) => {
  return useQuery({
    ...queryKeys.prompts.allByUserId(userId),
    onError(error) {
      onError?.(error);
    },
    enabled: !!userId,
  });
};
