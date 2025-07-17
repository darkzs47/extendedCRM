import {OrderTool} from "../OrderTool/OrderTool";
import {OrderStatus} from "../../../types/OrdersTypes/OrderStatus";

export interface Order {
    id: number;
    customerId: number;
    status: OrderStatus;
    finalPrice: number;
    createdAt?: Date;
    completedAt?: Date;

    tools?: OrderTool[];
}