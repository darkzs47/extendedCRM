export class LoginUserDto {
    constructor(
        readonly email: string,
        readonly password: string,
    ) {    }
}