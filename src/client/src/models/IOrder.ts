import type {ITool} from "./ITool.ts";
import type {OrderStatus} from "../types/orderStatus.ts";

export interface IOrder {
    id: number;
    customerId: number;
    status: OrderStatus;
    finalPrice: number;
    createdAt: Date;
    completedAt: Date;
    tools: ITool[],
}