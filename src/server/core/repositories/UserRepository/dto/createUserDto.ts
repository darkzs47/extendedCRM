export class CreateUserDto {
    constructor(
        readonly id: number,
        readonly secondName: string,
        readonly name: string,
        readonly lastName: string,
        readonly email: string,
        readonly phone: string,
        readonly password: string,
        readonly role: string,
        readonly supplierID?: number,
    ) {    }
}