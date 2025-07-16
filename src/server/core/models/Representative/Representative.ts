export class Representative {
    constructor(
        readonly id: number,
        readonly secondName: string,
        readonly name: string,
        readonly lastName: string,
        readonly representativePosition: string,
        readonly email: string,
        readonly phone: string,
        readonly isMain: boolean,
    ) { }
}