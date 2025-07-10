export interface UpdateToolRequest {
    id: number;
    sellPrice: number;
    purchasePrice?: number;
    supplierId?: number;
}