export class RegisterDto {
    constructor(
        readonly secondName: string,
        readonly name: string,
        readonly lastName: string,
        readonly email: string,
        readonly phone: string,
        readonly password: string,
        readonly role: undefined,
        readonly supplierId: undefined,
    ) {    }
}