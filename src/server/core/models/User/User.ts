export type UserRole = "admin" | "user" | "supplier" | "employee";

export class User {
    constructor(
        readonly id: number,
        readonly secondName: string,
        readonly name: string,
        readonly lastName: string,
        readonly email: string,
        readonly phone: string,
        readonly password: string,
        readonly role: UserRole,
        readonly supplierID?: number,
    ) {
    }
}