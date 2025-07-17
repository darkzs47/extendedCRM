import type {OrderStatus} from "../../types/orderStatus.ts";

export interface UpdateStatusOrderRequest {
    id: number,
    status: OrderStatus,
}