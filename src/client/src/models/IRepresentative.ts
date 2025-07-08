import type {ICustomerFullInfo} from "./ICustomerFullInfo.ts";
import type {ISupplier} from "./ISupplier.ts";

export interface IRepresentative {
    id: number;
    secondName: string,
    name: string,
    lastName: string,
    position: string,
    phone: string,
    email: string,
    isMain: boolean,
    customerId?: number,
    supplierId?: number,

    customer?: ICustomerFullInfo,
    supplier?: ISupplier,
}