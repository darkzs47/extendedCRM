import {
    CUSTOMERS_FAILURE,
    CUSTOMERS_SUCCESS,
    type CustomersActionTypes,
    type CustomersState,
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
        case CUSTOMERS_FAILURE:
            return {
                ...state,
            }
        default:
            return state;
    }
}