export class UpdateCustomerDiscountDto {
    constructor(
        readonly id: number,
        readonly discount: number,
    ) {}
}