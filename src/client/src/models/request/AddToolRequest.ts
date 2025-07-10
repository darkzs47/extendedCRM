export interface AddToolRequest {
    name: string;
    purchasePrice: number;
    sellPrice: number;
    categoryId: number;
    supplierId?: number;
}