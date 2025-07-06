import type {ICustomerFullInfo} from "../models/ICustomerFullInfo.ts";

export const GET_CUSTOMER_SUCCESS = 'GET_CUSTOMER_SUCCESS';
export const CUSTOMER_FAILURE = 'CUSTOMER_FAILURE';
export const CUSTOMER_RESET = 'CUSTOMER_RESET';

export interface CustomerState {
    customer: ICustomerFullInfo | null;
}

export interface CustomerGetAction {
    type: typeof GET_CUSTOMER_SUCCESS;
    payload: ICustomerFullInfo;
}

export interface CustomerFailureAction {
    type: typeof CUSTOMER_FAILURE;
}

export interface CustomerResetAction {
    type: typeof CUSTOMER_RESET;
}

export type CustomerActionTypes = CustomerGetAction | CustomerFailureAction | CustomerResetAction;