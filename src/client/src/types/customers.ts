import type {ICustomer} from "../models/ICustomer.ts";

type UpdateDiscountCustomer = Pick<ICustomer, "id" | "discount">

export const DELETE_CUSTOMER = 'DELETE_CUSTOMER';
export const UPDATE_DISCOUNT = 'UPDATE_DISCOUNT';
export const CUSTOMERS_SUCCESS = 'CUSTOMERS_SUCCESS';
export const CUSTOMERS_FAILURE = 'CUSTOMERS_FAILURE';

export interface CustomersState {
    customers: ICustomer[] | null;
}

export interface CustomersSuccessAction {
    type: typeof CUSTOMERS_SUCCESS;
    payload: ICustomer[];
}

export interface UpdateDiscountCustomerAction {
    type: typeof UPDATE_DISCOUNT;
    payload: UpdateDiscountCustomer;
}

export interface DeleteCustomerAction {
    type: typeof DELETE_CUSTOMER;
    payload: number;
}

export interface CustomersFailureAction {
    type: typeof CUSTOMERS_FAILURE;
}

export type CustomersActionTypes =
    CustomersFailureAction |
    CustomersSuccessAction |
    DeleteCustomerAction |
    UpdateDiscountCustomerAction;