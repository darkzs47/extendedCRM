import {OrderStatus} from "../../../../types/OrdersTypes/OrderStatus";

export class CreateOrderDto {
    constructor(
        readonly customerId: number,
        tools: {
            toolId: number,
            quantity: number,
        } []
    ) {}
}