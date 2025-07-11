import {ICategoryRepository} from "../../repositories/CategoryRepository/CategoryRepository";
import {CategoryModel} from "../../../infrastructure/db/models/CategoryModel/CategoryModel";
import {CreateCategoryDto} from "../../repositories/CategoryRepository/dto/CreateCategoryDto";
import {UpdateMarkupCategoryDto} from "../../repositories/CategoryRepository/dto/UpdateMarkupCategoryDto";

export class CategoryService {
    constructor(
        readonly categoryRepository: ICategoryRepository,
    ) {    }

    async getAllCategories(): Promise<CategoryModel[]> {
        const categories: CategoryModel[] = await this.categoryRepository.getAllCategories();
        return categories;
    }

    async createCategory(dto: CreateCategoryDto): Promise<CategoryModel> {
        const category: CategoryModel | null = await this.categoryRepository.createCategory(dto);
        if (!category) throw new Error("Категория не создана");
        return category;
    }

    async updateCategory(dto: UpdateMarkupCategoryDto): Promise<CategoryModel> {
        const category: CategoryModel | null = await this.categoryRepository.updateMarkupCategory(dto)
        if (!category) throw new Error("Наценка категории не изменена");
        return category;
    }

    async deleteCategory(id: number): Promise<void> {
        const deleteResult = await this.categoryRepository.deleteCategory(id);
        if (!deleteResult) throw new Error("Не удалось удалить категорию");
        return
    }
}