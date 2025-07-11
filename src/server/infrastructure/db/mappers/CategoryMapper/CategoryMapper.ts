import {Category} from "../../../../core/models/Category/Category";
import {CategoryModel} from "../../models/CategoryModel/CategoryModel";

type CategoryWithoutId = Omit<Category, "id">;

export class CategoryMapper {
    static toModel(data: CategoryWithoutId): Partial<CategoryModel> {
        return {
            name: data.name,
            markup: data.markup,
        }
    }
}