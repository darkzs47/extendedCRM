import {ICategoryRepository} from "../../../core/repositories/CategoryRepository/CategoryRepository";
import {CategoryModel} from "../models/CategoryModel/CategoryModel";
import {CreateCategoryDto} from "../../../core/repositories/CategoryRepository/dto/CreateCategoryDto";
import {UpdateMarkupCategoryDto} from "../../../core/repositories/CategoryRepository/dto/UpdateMarkupCategoryDto";
import {CategoryMapper} from "../mappers/CategoryMapper/CategoryMapper";

export class CategoryRepositoryPostgres implements ICategoryRepository {
    async getAllCategories(): Promise<CategoryModel[]> {
        const categories: CategoryModel[] = await CategoryModel.findAll();
        return categories;
    }

    async createCategory(dto: CreateCategoryDto): Promise<CategoryModel | null> {
        const category: CategoryModel | null = await CategoryModel.create(CategoryMapper.toModel(dto));
        return category;
    }

    async updateMarkupCategory(dto: UpdateMarkupCategoryDto): Promise<CategoryModel | null> {
        const category: CategoryModel | null =  await CategoryModel.findByPk(dto.id);
        category ? await category.update(
            {markup: dto.markup}
        ) : null;
        return category;
    }

    async deleteCategory(id: number): Promise<CategoryModel | null> {
        const category: CategoryModel | null = await CategoryModel.findByPk(id)
        category ? await category.destroy() : null;
        return category;
    }
}