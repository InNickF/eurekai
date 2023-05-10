import { Prompt, PromptCategory, PromptPayload } from "@renderer/types";
import { DB } from ".";
import { NotFoundError, getCreatedAt } from "@renderer/utils";

type PromisePrompt = Promise<Prompt>;

export class PromptRepository extends DB {
  constructor() {
    super();
  }

  async getAllPrompts(): Promise<Prompt[]> {
    return await this.prompts.toArray();
  }

  async getPromptById(id: Prompt["id"]): PromisePrompt {
    const prompt = await this.prompts.get(id);
    if (!prompt) throw new NotFoundError();
    return prompt;
  }

  async getPromptByUserId(userId: Prompt["userId"]): PromisePrompt {
    if (!userId) throw new NotFoundError();
    const prompt = await this.prompts.get(userId);
    if (!prompt) throw new NotFoundError();
    return prompt;
  }

  async getPromptsByUserId(userId: Prompt["userId"]): Promise<Prompt[]> {
    if (!userId) throw new NotFoundError();
    return await this.prompts
      .filter((prompt) => prompt.userId === userId || prompt.userId === null)
      .toArray();
  }

  async getPromptsByCategoryId(
    categoryId: PromptCategory["id"]
  ): Promise<Prompt[]> {
    return await this.prompts.where("categoryId").equals(categoryId).toArray();
  }

  async addPrompt(prompt: PromptPayload): Promise<Prompt> {
    const promptId = (await this.prompts.add({
      ...prompt,
      createdAt: getCreatedAt(),
    } as Prompt)) as number;
    const addedPrompt = await this.getPromptById(promptId);
    return addedPrompt as Prompt;
  }

  async updatePrompt(prompt: Prompt): Promise<Prompt> {
    await this.prompts.update(prompt.id, prompt);
    return prompt;
  }

  async deletePrompt(prompt: Prompt): Promise<void> {
    await this.prompts.delete(prompt.id);
  }

  async deletePromptsByCategoryId(
    categoryId: PromptCategory["id"]
  ): Promise<void> {
    const prompts = await this.getPromptsByCategoryId(categoryId);
    await Promise.all(prompts.map((prompt) => this.deletePrompt(prompt)));
  }
}
