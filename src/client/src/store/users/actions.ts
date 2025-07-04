import type {Dispatch} from "redux";
import UserService from "../../services/UserService.ts";
import {USERS_FAILURE, USERS_SUCCESS} from "../../types/users.ts";

export const getAllUsers = () =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const response = await UserService.getAllUsers();
            dispatch({ type: USERS_SUCCESS, payload: response.data });
        } catch (e) {
            dispatch({ type: USERS_FAILURE });
        }
}