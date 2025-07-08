import type {Dispatch} from "redux";
import {CUSTOMERS_FAILURE, CUSTOMERS_SUCCESS, DELETE_CUSTOMER, UPDATE_DISCOUNT} from "../../types/customers";
import CustomerService from "../../services/CustomerService";
import type {DeleteRequest} from "../../models/request/DeleteRequest.ts";
import type {DiscountRequest} from "../../models/request/DiscountRequest.ts";

export const getAll = () => {
    return async (dispatch: Dispatch): Promise<void> => {
        try {
            const response = await CustomerService.getAll();
            dispatch({type: CUSTOMERS_SUCCESS, payload: response.data});
        } catch (e) {
            dispatch({type: CUSTOMERS_FAILURE});
        }
    }
}

export const deleteCustomer = (request: DeleteRequest) => {
    return async (dispatch: Dispatch): Promise<void> => {
        try {
            await CustomerService.deleteCustomer(request);
            dispatch({type: DELETE_CUSTOMER, payload: request.id})
        } catch (e) {
            dispatch({type: CUSTOMERS_FAILURE});
        }
    }
}

export const updateDiscount = (request: DiscountRequest) => {
    return async (dispatch: Dispatch): Promise<void> => {
        try {
            await CustomerService.updateDiscount(request);
            dispatch({type: UPDATE_DISCOUNT})
        } catch (e) {
            dispatch({type: CUSTOMERS_FAILURE})
        }
    }
}