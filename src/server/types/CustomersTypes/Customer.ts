import {CustomerModel} from "../../infrastructure/db/models/CustomerModel/CustomerModel";

export type CustomerShort = Pick<CustomerModel, 'id' | 'companyName' | 'phone' | 'email' | 'discount'>;
