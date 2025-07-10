import type {ICategory} from "./ICategory.ts";
import type {ISupplier} from "./ISupplier.ts";

export interface ITool {
    id: number;
    name: string;
    categoryId: number;
    purchasePrice?: number;
    sellPrice: number;
    category?: ICategory;
    supplierId?: number;
    supplier?: ISupplier;
}