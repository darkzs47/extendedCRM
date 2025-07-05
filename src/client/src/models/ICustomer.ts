export interface ICustomer {
    id: number;
    company: string;
    legalForm: string; // Возможно тип из unions
    inn: string;
    kpp: string;
    ogrn: string;
    email: string;
    phone: string;
    discount: number;
    addressActualId: number;
    addressLegalId: number;
    representativeId: number;
    bankAccountId: number;
}