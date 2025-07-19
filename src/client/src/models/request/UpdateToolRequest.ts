export interface UpdateToolRequest {
    id: number;
    sellPrice?: number;
    purchasePrice?: number;
    isAvailable?: boolean;
    supplierId?: number;
}