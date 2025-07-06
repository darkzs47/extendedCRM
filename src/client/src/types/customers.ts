import type {ICustomer} from "../models/ICustomer.ts";

export const CUSTOMERS_SUCCESS = 'CUSTOMERS_SUCCESS';
export const CUSTOMERS_FAILURE = 'CUSTOMERS_FAILURE';

export interface CustomersState {
    customers: ICustomer[] | null;
}

export interface CustomersSuccessAction {
    type: typeof CUSTOMERS_SUCCESS;
    payload: ICustomer[];
}

export interface CustomersFailureAction {
    type: typeof CUSTOMERS_FAILURE;
}

export type CustomersActionTypes = CustomersFailureAction | CustomersSuccessAction;