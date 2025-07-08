export class UpdateDiscountDto {
    constructor(
        readonly id: number,
        readonly discount: number,
    ) {}
}