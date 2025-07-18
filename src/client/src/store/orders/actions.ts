import type {Dispatch} from "redux";
import type {UpdateStatusOrderRequest} from "../../models/request/UpdateStatusOrderRequest.ts";
import OrderService from "../../services/OrderService.ts";
import {DELETE_ORDER, GET_ALL_ORDERS, ORDER_FAILURE, UPDATE_STATUS_ORDER} from "../../types/orders.ts";
import type {DeleteRequest} from "../../models/request/DeleteRequest.ts";

export const getAllOrders = () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await OrderService.getAllOrders();
            dispatch({ type: GET_ALL_ORDERS, payload: response.data });
        } catch (e) {
            dispatch({ type: ORDER_FAILURE })
        }
    }
}

export const updateStatusOrder = (request: UpdateStatusOrderRequest) => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await OrderService.updateStatusOrder(request)
            dispatch({ type: UPDATE_STATUS_ORDER, payload: {...request, completedAt: response.data.completedAt } });
        } catch (e) {
            dispatch({ type: ORDER_FAILURE })
        }
    }
}

export const deleteOrder = (request: DeleteRequest) => {
    return async (dispatch: Dispatch) => {
        try {
            await OrderService.deleteOrder(request)
            dispatch({ type: DELETE_ORDER, payload: request.id })
        } catch (e) {
            dispatch({ type: ORDER_FAILURE })
        }
    }
}