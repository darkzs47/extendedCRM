import {UserRole} from "../../core/models/User/User";

export type UserAuth = {
    accessToken: string;
    refreshToken: string;
    id: number;
    role: UserRole;
}