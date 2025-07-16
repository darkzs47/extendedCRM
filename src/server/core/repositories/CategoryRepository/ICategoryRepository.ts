import {UpdateMarkupCategoryDto} from "./dto/UpdateMarkupCategoryDto";
import {CreateCategoryDto} from "./dto/CreateCategoryDto";
import {CategoryModel} from "../../../infrastructure/db/models/CategoryModel/CategoryModel";

export interface ICategoryRepository {
    getAllCategories(): Promise<CategoryModel[]>;
    createCategory(dto: CreateCategoryDto) : Promise<CategoryModel | null>;
    updateMarkupCategory(dto: UpdateMarkupCategoryDto): Promise<CategoryModel | null>;
    deleteCategory(id: number): Promise<CategoryModel | null>;
}