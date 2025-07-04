import type {AxiosResponse} from "axios";
import api from "../http/index";
import type {AuthResponse} from "../models/response/AuthResponse.ts";
import type {RegisterRequest} from "../models/request/RegisterRequest.ts";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return api.post<AuthResponse>('/auth/login', {email, password});
    }

    static async registration(request: RegisterRequest): Promise<AxiosResponse<AuthResponse>> {
        return api.post<AuthResponse>('/auth/registration', request);
    }

    static async logout(): Promise<void> {
        return api.post('/auth/logout');
    }
}