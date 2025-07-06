import type {ICustomer} from "./ICustomer.ts";
import type {IAddress} from "./IAddress.ts";
import type {IRepresentative} from "./IRepresentative.ts";

export interface IBranch {
    id: number;
    name: string;
    phone: string;
    email: string;
    addressActualId: number;
    addressLegalId: number;
    representativeId: number;
    customerId?: number;
    // supplierId?: number;
    isMain: boolean;

    addressActual: IAddress;
    addressLegal: IAddress;
    representative: IRepresentative;
    customer?: ICustomer;
    // supplier?: ISupplier;
}