import {UserRole} from "../../../models/User/User";

export class UpdateUserDto {
    constructor
    (
        readonly id: number,
        readonly email: string,
        readonly phone: string,
        readonly role: UserRole,
        readonly supplierId?: number,
        ) {}
}