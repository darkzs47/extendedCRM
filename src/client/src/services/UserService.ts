import type {AxiosResponse} from "axios";
import api from "../http/index";
import type {UserResponse} from "../models/response/UserResponse.ts";
import type {DeleteRequest} from "../models/request/DeleteRequest.ts";
import type {UpdateUserRequest} from "../models/request/UpdateUserRequest.ts";

export default class UserService {
    static async getAllUsers(): Promise<AxiosResponse<UserResponse>> {
        return api.get<UserResponse>("/users/");
    }

    static async deleteUser(request: DeleteRequest): Promise<AxiosResponse<void>> {
        return api.delete<void>(`/users/${request.id}`);
    }

    static async updateUser(request: UpdateUserRequest): Promise<AxiosResponse<void>> {
        return api.patch<void>(`/users/${request.id}`, request);
    }
}