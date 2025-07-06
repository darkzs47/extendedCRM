import {
    CUSTOMERS_FAILURE,
    CUSTOMERS_SUCCESS,
    type CustomersActionTypes,
    type CustomersState
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
        case CUSTOMERS_FAILURE:
            return {
                ...state,
            }
        default:
            return state;
    }
}