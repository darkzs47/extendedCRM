import type {IUser} from "../models/IUser.ts";

export const USERS_SUCCESS = 'USERS_SUCCESS';
export const USERS_FAILURE = 'USERS_FAILURE';

export interface UsersState {
    users: IUser[] | null;
}

export interface UsersSuccessAction {
    type: typeof USERS_SUCCESS;
    payload: IUser[];
}

export interface UsersFailureAction {
    type: typeof USERS_FAILURE;
}

export type UsersActionTypes = UsersSuccessAction | UsersFailureAction;