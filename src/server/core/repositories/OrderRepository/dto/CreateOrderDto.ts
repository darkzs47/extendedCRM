export class CreateOrderDto {
    constructor(
        readonly customerId: number,
        readonly finalPrice: number,
        readonly tools: {
            toolId: number,
            quantity: number,
        }[]
    ) {}
}