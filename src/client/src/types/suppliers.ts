import type {ISupplier} from "../models/ISupplier.ts";

export const DELETE_SUPPLIER = 'DELETE_SUPPLIER';
export const SUPPLIERS_SUCCESS = 'SUPPLIERS_SUCCESS';
export const SUPPLIERS_FAILURE = 'SUPPLIERS_FAILURE';

export interface SuppliersState {
    suppliers: ISupplier[] | null;
}

export interface SuppliersSuccessAction {
    type: typeof SUPPLIERS_SUCCESS;
    payload: ISupplier[];
}

export interface DeleteSupplierAction {
    type: typeof DELETE_SUPPLIER;
    payload: number;
}

export interface SuppliersFailureAction {
    type: typeof SUPPLIERS_FAILURE;
}

export type SuppliersActionTypes =
    SuppliersFailureAction |
    SuppliersSuccessAction |
    DeleteSupplierAction;