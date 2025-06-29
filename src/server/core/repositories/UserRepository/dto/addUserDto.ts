export class AddUserDto {
    constructor(
        secondName: string,
        name: string,
        lastName: string,
        email: string,
        phone: string,
        password: string,
        role: string,
        id?: number,
        supplierID?: number,
    ) {    }
}