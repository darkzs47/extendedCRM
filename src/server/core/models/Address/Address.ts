export class Address {
    constructor(
        readonly id: number,
        readonly country: string,
        readonly region: string,
        readonly city: string,
        readonly street: string,
        readonly house: string,
        readonly postCode: string,
        readonly building?: string,
    ) { }
}