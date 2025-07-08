import {
    GET_SUPPLIER_SUCCESS,
    SUPPLIER_FAILURE,
    SUPPLIER_RESET,
    type SupplierActionTypes,
    type SupplierState
} from "../../types/supplier.ts";

const initialState: SupplierState = {
    supplier: null,
}

export const supplierReducer = (state = initialState, action: SupplierActionTypes) => {
    switch (action.type) {
        case GET_SUPPLIER_SUCCESS:
            return {
                ...state,
                supplier: action.payload
            }
        case SUPPLIER_RESET:
            return {
                ...state,
                supplier: null,
            }
        case SUPPLIER_FAILURE:
            return {
                ...state,
            }
        default:
            return state;
    }
}