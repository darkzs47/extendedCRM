import type {IUser} from "../models/IUser.ts";

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export interface UserState {
    user: IUser | null;
    isAuthUser: boolean;
}

export interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    payload: IUser;
}

export interface LoginFailureAction {
    type: typeof LOGIN_FAILURE;
}

export interface LogoutAction {
    type: typeof LOGOUT;
}

export type UserActionTypes = LoginSuccessAction | LoginFailureAction | LogoutAction;