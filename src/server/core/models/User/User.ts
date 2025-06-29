type UserRole = "admin" | "user" | "supplier";

export class User {
    constructor(
        id: number,
        secondName: string,
        name: string,
        lastName: string,
        email: string,
        phone: string,
        password: string,
        role: UserRole,
        supplierID?: number,
    ) {
    }
}