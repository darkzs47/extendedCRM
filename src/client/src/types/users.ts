import type {IUser} from "../models/IUser.ts";
import type {UserDataForUpdate} from "../components/tables/rows/User.tsx";

export const USERS_SUCCESS = 'USERS_SUCCESS';
export const USERS_FAILURE = 'USERS_FAILURE';
export const USER_DELETE = 'USER_DELETE';
export const USER_UPDATE = 'USER_UPDATE';

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


export interface UsersUpdateAction {
    type: typeof USER_UPDATE;
    payload: UserDataForUpdate;
}

export type UsersActionTypes = UsersSuccessAction | UsersFailureAction | UsersDeleteAction | UsersUpdateAction;