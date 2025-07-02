export class Token {
    constructor(
        readonly id: number,
        readonly userId: number,
        public refreshToken: string,
    ) {    }
}