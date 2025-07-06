import {
    CUSTOMER_FAILURE,
    type CustomerActionTypes,
    type CustomerState,
    GET_CUSTOMER_SUCCESS,
    CUSTOMER_RESET
} from "../../types/customer.ts";

const initialState: CustomerState = {
    customer: null,
}

export const customerReducer = (state = initialState, action: CustomerActionTypes) => {
    switch (action.type) {
        case GET_CUSTOMER_SUCCESS:
            return {
                ...state,
                customer: action.payload
            }
        case CUSTOMER_RESET:
            return {
                ...state,
                customer: null,
            }
        case CUSTOMER_FAILURE:
            return {
                ...state,
            }
        default:
            return state;
    }
}