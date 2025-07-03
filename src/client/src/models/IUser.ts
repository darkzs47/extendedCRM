import type {UserRole} from "../../../server/core/models/User/User.ts";

export interface IUser {
    id: number;
    secondName: string,
    name: string,
    lastName: string,
    email: string,
    phone: string,
    role: UserRole,
}