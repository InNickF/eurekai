import { PromptCategory, PromptCategoryPayload } from "@renderer/types";
import { DB } from ".";
import { PromptRepository } from "./prompt";
import { NotFoundError, getCreatedAt } from "@renderer/utils";

type PromisePromptCategory = Promise<PromptCategory>;

export class PromptCategoryRepository extends DB {
  constructor() {
    super();
  }

  async getAllPromptCategories(): Promise<PromptCategory[]> {
    return await this.promptCategories.toArray();
  }

  async getPromptCategoryById(id: PromptCategory["id"]): PromisePromptCategory {
    const prompt = await this.promptCategories.get(id);
    if (!prompt) throw new NotFoundError();
    return prompt;
  }

  async getPromptCategoriesByUserId(
    userId: PromptCategory["userId"]
  ): Promise<PromptCategory[]> {
    if (!userId) throw new NotFoundError();
    return await this.promptCategories.where("userId").equals(userId).toArray();
  }

  async addPromptCategory(
    promptCategory: PromptCategoryPayload
  ): Promise<PromptCategory> {
    const promptCategoryId = (await this.promptCategories.add({
      ...promptCategory,
      createdAt: getCreatedAt(),
    } as PromptCategory)) as number;

    const addedPromptCategory = await this.getPromptCategoryById(
      promptCategoryId
    );
    return addedPromptCategory as PromptCategory;
  }

  async updatePromptCategory(
    promptCategory: PromptCategory
  ): Promise<PromptCategory> {
    await this.promptCategories.update(promptCategory.id, promptCategory);
    return promptCategory;
  }

  async deletePromptCategory(promptCategory: PromptCategory): Promise<void> {
    await this.promptCategories.delete(promptCategory.id);
    const promptRepository = new PromptRepository();
    await promptRepository.deletePromptsByCategoryId(promptCategory.id);
  }

  async deletePromptCategoriesByUserId(
    userId: PromptCategory["userId"]
  ): Promise<void> {
    const promptCategories = await this.getPromptCategoriesByUserId(userId);
    await Promise.all(
      promptCategories.map((promptCategory) =>
        this.deletePromptCategory(promptCategory)
      )
    );
  }
}
