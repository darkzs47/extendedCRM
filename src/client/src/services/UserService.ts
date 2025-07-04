import type {AxiosResponse} from "axios";
import api from "../http/index";
import type {UserResponse} from "../models/response/UserResponse.ts";

export default class UserService {
    static getAllUsers(): Promise<AxiosResponse<UserResponse>> {
        return api.get<UserResponse>("/users/");
    }
}