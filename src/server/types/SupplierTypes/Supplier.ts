import {SupplierModel} from "../../infrastructure/db/models/SupplierModel/SupplierModel";

export type SupplierShort = Pick<SupplierModel, 'id' | 'companyName' | 'phone' | 'email'>;
