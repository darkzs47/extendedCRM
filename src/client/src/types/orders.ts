import type {IOrder} from "../models/IOrder.ts";

export const GET_ALL_ORDERS = "GET_ALL_ORDERS";
export const DELETE_ORDER = "DELETE_ORDER";
export const UPDATE_STATUS_ORDER = "UPDATE_STATUS_ORDER";
export const ORDER_FAILURE = "ORDER_FAILURE";

export interface OrdersState {
    orders: IOrder[] | null;
}

export interface GetOrdersAction {
    type: typeof GET_ALL_ORDERS;
    payload: IOrder[];
}

export interface UpdateStatusOrderAction {
    type: typeof UPDATE_STATUS_ORDER;
    payload: Pick<IOrder, "id" | "status">;
}

export interface DeleteOrderAction {
    type: typeof DELETE_ORDER;
    payload: number;
}

export interface OrderFailure {
    type: typeof ORDER_FAILURE;
}

export type OrdersActionTypes = GetOrdersAction | UpdateStatusOrderAction | DeleteOrderAction | OrderFailure;