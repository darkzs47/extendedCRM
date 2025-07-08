import type {UserRole} from "../../../server/core/models/User/User.ts";
import type {ISupplier} from "./ISupplier.ts";

export interface IUser {
    id: number;
    secondName: string,
    name: string,
    lastName: string,
    email: string,
    phone: string,
    role: UserRole,
    supplierId?: number;
    supplier?: ISupplier;
}