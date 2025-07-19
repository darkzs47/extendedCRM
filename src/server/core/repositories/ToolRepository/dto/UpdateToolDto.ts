export class UpdateToolDto {
    constructor(
        readonly id: number,
        readonly purchasePrice?: number,
        readonly sellPrice?: number,
        readonly isAvailable?: boolean,
        readonly supplierId?: number,
        ) {    }
}