import type {ICustomer} from "./ICustomer.ts";

export interface IRepresentative {
    id: number;
    secondName: string,
    name: string,
    lastName: string,
    position: string,
    phone: string,
    email: string,
    isMain: boolean,
    customerId: number,
    // supplierId: number,

    customer: ICustomer,
    // supplier: ISupplier,
}