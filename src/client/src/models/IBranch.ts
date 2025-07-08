import type {ICustomerFullInfo} from "./ICustomerFullInfo.ts";
import type {IAddress} from "./IAddress.ts";
import type {IRepresentative} from "./IRepresentative.ts";
import type {ISupplier} from "./ISupplier.ts";

export interface IBranch {
    id: number;
    name: string;
    phone: string;
    email: string;
    addressActualId: number;
    addressLegalId: number;
    representativeId: number;
    customerId?: number;
    supplierId?: number;
    isMain: boolean;

    addressActual: IAddress;
    addressLegal: IAddress;
    representative: IRepresentative;
    customer?: ICustomerFullInfo;
    supplier?: ISupplier;
}