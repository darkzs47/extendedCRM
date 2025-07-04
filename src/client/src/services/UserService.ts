import type {AxiosResponse} from "axios";
import api from "../http/index";
import type {UserResponse} from "../models/response/UserResponse.ts";
import type {DeleteRequest} from "../models/request/DeleteRequest.ts";

export default class UserService {
    static getAllUsers(): Promise<AxiosResponse<UserResponse>> {
        return api.get<UserResponse>("/users/");
    }

    static deleteUser(request: DeleteRequest): Promise<AxiosResponse<void>> {
        return api.delete<void>("users/delete", {
            data: request
        });
    }
}