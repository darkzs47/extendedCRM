import type {IBranch} from "./IBranch.ts";
import type {IRepresentative} from "./IRepresentative.ts";

export interface ICustomerFullInfo {
    id: number;
    companyName: string;
    legalForm: string;
    inn: string;
    kpp: string;
    ogrn: string;
    email: string;
    phone: string;
    discount: number;

    branches: IBranch[];
    representatives: IRepresentative[];
}