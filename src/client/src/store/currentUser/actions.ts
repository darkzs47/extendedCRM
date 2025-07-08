import type {Dispatch} from "redux";
import {LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT} from "../../types/currentUser.ts";
import AuthService from "../../services/AuthService.ts";
import type {RegisterRequest} from "../../models/request/RegisterRequest.ts";
import axios from "axios";
import type {AuthResponse} from "../../models/response/AuthResponse.ts";
import {API_URL} from "../../http";

export const login = (email: string, password: string) => {
    return async (dispatch: Dispatch): Promise<{ success: boolean }> => {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem("token", response.data.accessToken);
            dispatch({ type: LOGIN_SUCCESS, payload: response.data });
            return {success: true};
        } catch (e) {
            dispatch({ type: LOGIN_FAILURE });
            return {success: false};
        }
    }
}

export const registration = (request: RegisterRequest) => {
    return async (dispatch: Dispatch): Promise<{ success: boolean }> => {
        try {
            const response = await AuthService.registration(request);
            localStorage.setItem("token", response.data.accessToken);
            dispatch({ type: LOGIN_SUCCESS, payload: response.data });
            return {success: true};
        } catch (e) {
            dispatch({ type: LOGIN_FAILURE });
            return {success: false};
        }
    }
}

export const logout = () => {
    return async (dispatch: Dispatch) => {
        try {
            await AuthService.logout();
            localStorage.removeItem("token");
            dispatch({ type: LOGOUT });
        } catch (e) {
            dispatch({ type: LOGIN_FAILURE });
        }
    }
}

export const checkAuth = () => {
    return async (dispatch: Dispatch): Promise<void> => {
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, {withCredentials: true})
            localStorage.setItem("token", response.data.accessToken);
            dispatch({ type: LOGIN_SUCCESS, payload: response.data });
        } catch (e) {
            dispatch({ type: LOGIN_FAILURE });
        }
    }
}