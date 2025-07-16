import {CategoryModel} from "../../models/CategoryModel/CategoryModel";
import {CreateCategoryDto} from "../../../../core/repositories/CategoryRepository/dto/CreateCategoryDto";

export class CategoryMapper {
    static toModel(data: CreateCategoryDto): Partial<CategoryModel> {
        return {
            ...data
        }
    }
}