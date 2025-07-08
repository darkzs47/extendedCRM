import type {Dispatch} from "redux";
import {GET_SUPPLIER_SUCCESS, SUPPLIER_FAILURE} from "../../types/supplier.ts";
import SupplierService from "../../services/SupplierService.ts";

export const getSupplierById = (id: number) =>
    async (dispatch: Dispatch): Promise<{ success: boolean } > => {
        try {
            const response = await SupplierService.getById(id);
            dispatch({type: GET_SUPPLIER_SUCCESS, payload: response.data});
            return { success: true };
        } catch (e) {
            dispatch({type: SUPPLIER_FAILURE});
            return { success :false };
        }
    }