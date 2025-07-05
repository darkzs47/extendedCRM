import type {UserRole} from "../../../../server/core/models/User/User.ts";

export interface UpdateUserRequest {
    id: number;
    email: string;
    phone: string;
    role: UserRole;
}