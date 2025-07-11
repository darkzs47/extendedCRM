export interface AddToolRequest {
    name: string;
    sellPrice: number;
    categoryId: number;
    purchasePrice?: number;
    supplierId?: number;
}