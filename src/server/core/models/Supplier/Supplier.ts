export class Supplier {
    constructor(
        readonly id: number,
        readonly companyName: string,
        readonly legalForm: string,
        readonly inn: string,
        readonly kpp: string,
        readonly ogrn: string,
        readonly email: string,
        readonly phone: string,
    ) {}
}