import {
    DELETE_SUPPLIER,
    SUPPLIERS_FAILURE,
    SUPPLIERS_SUCCESS,
    type SuppliersActionTypes,
    type SuppliersState
} from "../../types/suppliers.ts";

const initialState: SuppliersState = {
    suppliers: null,
}

export const suppliersReducer = (state = initialState, action: SuppliersActionTypes) => {
    switch (action.type) {
        case SUPPLIERS_SUCCESS:
            return {
                ...state,
                suppliers: action.payload,
            }
        case DELETE_SUPPLIER:
            return {
                ...state,
                suppliers: state.suppliers
                    ? state.suppliers.filter(supplier => supplier.id !== action.payload)
                    : null
            }
        case SUPPLIERS_FAILURE:
            return {
                ...state,
            }
        default:
            return state;
    }
}