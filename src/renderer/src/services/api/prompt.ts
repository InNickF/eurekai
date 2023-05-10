import { PromptRepository } from "@renderer/repositories/prompt";
import { PromptSchema } from "@renderer/schemas";
import { PromptPayload, Prompt } from "@renderer/types";
import { z } from "zod";

export const getPrompts = async () => {
  const promptRepository = new PromptRepository();
  const response = await promptRepository.getAllPrompts();
  return z.array(PromptSchema).parse(response);
};
export const getPrompt = async (promptId: Prompt["id"]) => {
  const promptRepository = new PromptRepository();
  const response = await promptRepository.getPromptById(promptId);
  return PromptSchema.parse(response);
};

export const getPromptByUserId = async (userId: Prompt["userId"]) => {
  const promptRepository = new PromptRepository();
  const response = await promptRepository.getPromptByUserId(userId);
  return PromptSchema.parse(response);
};

export const getPromptsByUserId = async (userId: Prompt["userId"]) => {
  const promptRepository = new PromptRepository();
  const response = await promptRepository.getPromptsByUserId(userId);
  return z.array(PromptSchema).parse(response);
};

export const createPrompt = async (prompt: PromptPayload) => {
  const promptRepository = new PromptRepository();
  const response = await promptRepository.addPrompt(prompt);
  return PromptSchema.parse(response);
};

export const updatePrompt = async (prompt: Prompt) => {
  const promptRepository = new PromptRepository();
  const response = await promptRepository.updatePrompt(prompt);
  return PromptSchema.parse(response);
};

export const deletePrompt = async (prompt: Prompt) => {
  const promptRepository = new PromptRepository();
  await promptRepository.deletePrompt(prompt);
  return "Prompt deleted successfully.";
};
