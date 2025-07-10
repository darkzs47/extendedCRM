import type {ICategory} from "./ICategory.ts";

export interface ITool {
    id: number;
    name: string;
    categoryId: number;
    purchasePrice: number;
    sellPrice: number;
    category: ICategory;
}