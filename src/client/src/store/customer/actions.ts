import type {Dispatch} from "redux";
import CustomerService from "../../services/CustomerService.ts";
import {CUSTOMER_FAILURE, GET_CUSTOMER_SUCCESS} from "../../types/customer.ts";

export const getById = (id: number) =>
    async (dispatch: Dispatch): Promise<{ success: boolean } > => {
        try {
            const response = await CustomerService.getById(id);
            dispatch({type: GET_CUSTOMER_SUCCESS, payload: response.data});
            return { success: true };
        } catch (e) {
            dispatch({type: CUSTOMER_FAILURE});
            return { success :false };
        }
    }