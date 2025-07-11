export class CreateToolDto {
    constructor(
        readonly name: string,
        readonly sellPrice: number,
        readonly categoryId: number,
        readonly purchasePrice?: number,
        readonly supplierId?: number,
    ) {}
}