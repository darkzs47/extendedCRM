import type {Dispatch} from "redux";
import type {DeleteRequest} from "../../models/request/DeleteRequest.ts";
import {DELETE_SUPPLIER, SUPPLIERS_FAILURE, SUPPLIERS_SUCCESS} from "../../types/suppliers.ts";
import SupplierService from "../../services/SupplierService.ts";

export const getAllSuppliers = () => {
    return async (dispatch: Dispatch): Promise<void> => {
        try {
            const response = await SupplierService.getAll();
            dispatch({type: SUPPLIERS_SUCCESS, payload: response.data});
        } catch (e) {
            dispatch({type: SUPPLIERS_FAILURE});
        }
    }
}

export const deleteSupplier = (request: DeleteRequest) => {
    return async (dispatch: Dispatch): Promise<void> => {
        try {
            await SupplierService.deleteSupplier(request);
            dispatch({type: DELETE_SUPPLIER, payload: request.id})
        } catch (e) {
            dispatch({type: SUPPLIERS_FAILURE});
        }
    }
}