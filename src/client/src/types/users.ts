import type {IUser} from "../models/IUser.ts";

export const USERS_SUCCESS = 'USERS_SUCCESS';
export const USERS_FAILURE = 'USERS_FAILURE';
export const USER_DELETE = 'USER_DELETE';

export interface UsersState {
    users: IUser[] | null;
}

export interface UsersSuccessAction {
    type: typeof USERS_SUCCESS;
    payload: IUser[];
}

export interface UsersDeleteAction {
    type: typeof USER_DELETE;
    payload: number;
}

export interface UsersFailureAction {
    type: typeof USERS_FAILURE;
}

export type UsersActionTypes = UsersSuccessAction | UsersFailureAction | UsersDeleteAction;