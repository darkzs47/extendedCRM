import type {Dispatch} from "redux";
import {CUSTOMERS_FAILURE, CUSTOMERS_SUCCESS, DELETE_CUSTOMER} from "../../types/customers";
import CustomerService from "../../services/CustomerService";
import type {DeleteRequest} from "../../models/request/DeleteRequest.ts";

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
            dispatch({type: DELETE_CUSTOMER})
        } catch (e) {
            dispatch({type: CUSTOMERS_FAILURE});
        }
    }
}