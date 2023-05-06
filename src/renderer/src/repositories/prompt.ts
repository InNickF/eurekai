import { Prompt, PromptCategory, PromptPayload } from "@renderer/types";
import { DB } from ".";

type PromisePrompt = Promise<Prompt | null>;

export class PromptRepository extends DB {
  constructor() {
    super();
  }

  async getAllPrompts(): Promise<Prompt[]> {
    return await this.prompts.toArray();
  }

  async getPromptById(id: Prompt["id"]): PromisePrompt {
    return (await this.prompts.get(id)) as Prompt;
  }

  async getPromptsByUserId(userId: Prompt["userId"]): Promise<Prompt[]> {
    return (await this.prompts
      .where("userId")
      .equals(userId)
      .toArray()) as Prompt[];
  }

  async getPromptsByCategoryId(
    categoryId: PromptCategory["id"]
  ): Promise<Prompt[]> {
    return (await this.prompts
      .where("categoryId")
      .equals(categoryId)
      .toArray()) as Prompt[];
  }

  async addPrompt(prompt: PromptPayload): Promise<Prompt> {
    const promptId = (await this.prompts.add(prompt as Prompt)) as number;
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
