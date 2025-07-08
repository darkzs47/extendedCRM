import type {ISupplierFullInfo} from "../models/ISupplierFullInfo.ts";

export const GET_SUPPLIER_SUCCESS = 'GET_SUPPLIER_SUCCESS';
export const SUPPLIER_FAILURE = 'SUPPLIER_FAILURE';
export const SUPPLIER_RESET = 'SUPPLIER_RESET';

export interface SupplierState {
    supplier: ISupplierFullInfo | null;
}

export interface SupplierGetAction {
    type: typeof GET_SUPPLIER_SUCCESS;
    payload: ISupplierFullInfo;
}

export interface SupplierFailureAction {
    type: typeof SUPPLIER_FAILURE;
}

export interface SupplierResetAction {
    type: typeof SUPPLIER_RESET;
}

export type SupplierActionTypes = SupplierGetAction | SupplierFailureAction | SupplierResetAction;