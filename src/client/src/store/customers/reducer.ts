import {
    CUSTOMERS_FAILURE,
    CUSTOMERS_SUCCESS,
    type CustomersActionTypes,
    type CustomersState, DELETE_CUSTOMER,
    UPDATE_DISCOUNT
} from "../../types/customers.ts";

const initialState: CustomersState = {
    customers: null,
}

export const customersReducer = (state = initialState, action: CustomersActionTypes) => {
    switch (action.type) {
        case CUSTOMERS_SUCCESS:
            return {
                ...state,
                customers: action.payload,
            }
        case UPDATE_DISCOUNT:
            return {
                ...state,
                customers: state.customers ?
                    state.customers.map(customer =>
                        customer.id === action.payload.id
                            ? { ...customer, ...action.payload }
                            : customer
                ) : null
            }
        case DELETE_CUSTOMER:
            return {
                ...state,
                customers: state.customers
                    ? state.customers.filter(customer => customer.id !== action.payload)
                    : null
            }
        case CUSTOMERS_FAILURE:
            return {
                ...state,
            }
        default:
            return state;
    }
}