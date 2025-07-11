export class Tool {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly sellPrice: number,
        readonly categoryId: number,
        readonly purchasePrice?: number,
        readonly supplierId?: number,
    ) {}
}