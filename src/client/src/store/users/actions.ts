import type {Dispatch} from "redux";
import UserService from "../../services/UserService.ts";
import {USER_DELETE, USER_UPDATE, USERS_FAILURE, USERS_SUCCESS} from "../../types/users.ts";
import type {DeleteRequest} from "../../models/request/DeleteRequest.ts";
import type {UpdateUserRequest} from "../../models/request/UpdateUserRequest.ts";

export const getAllUsers = () =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const response = await UserService.getAllUsers();
            dispatch({ type: USERS_SUCCESS, payload: response.data });
        } catch (e) {
            dispatch({ type: USERS_FAILURE });
        }
    }

export const deleteUser = (request: DeleteRequest) =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            await UserService.deleteUser(request);
            dispatch({ type: USER_DELETE, payload: request.id });
        } catch (e) {
            dispatch({ type: USERS_FAILURE });
        }
    }

export const updateUser = (request: UpdateUserRequest) =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            await UserService.updateUser(request);
            dispatch({ type: USER_UPDATE, payload: request });
        } catch (e) {
            dispatch({ type: USERS_FAILURE });
        }
    }