import {
    DELETE_ORDER,
    GET_ALL_ORDERS,
    ORDER_FAILURE,
    type OrdersActionTypes,
    type OrdersState,
    UPDATE_STATUS_ORDER
} from "../../types/orders.ts";

const initialState: OrdersState = {
    orders: null,
}

export const ordersReducer = (state = initialState, action: OrdersActionTypes) => {
    switch (action.type) {
        case GET_ALL_ORDERS:
            return {...state, orders: action.payload};
        case UPDATE_STATUS_ORDER:
            return {
                ...state,
                orders: state.orders
                    ? state.orders.map((order) =>
                        order.id === action.payload.id
                            ? {...order, ...action.payload}
                            : order)
                    : null
            }
        case DELETE_ORDER:
            return {
                ...state,
                orders: state.orders
                    ? state.orders.filter((order) => order.id !== action.payload)
                    : null
            };
        case ORDER_FAILURE:
            return {
                ...state,
            }
        default:
            return state;
    }
}