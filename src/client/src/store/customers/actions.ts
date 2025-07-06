import type {Dispatch} from "redux";
import {CUSTOMERS_FAILURE, CUSTOMERS_SUCCESS} from "../../types/customers";
import CustomerService from "../../services/CustomerService";

export const getAll = () =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const response = await CustomerService.getAll();
            dispatch({ type: CUSTOMERS_SUCCESS, payload: response.data });
        } catch (e) {
            dispatch({ type: CUSTOMERS_FAILURE });
        }
    }