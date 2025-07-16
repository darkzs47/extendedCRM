import {CustomerModel} from "../../../infrastructure/db/models/CustomerModel/CustomerModel";
import {CreateCustomerDto} from "./dto/CreateCustomerDto";
import {UpdateCustomerDiscountDto} from "./dto/UpdateCustomerDiscountDto";

export interface ICustomerRepository {
    getAllCustomers(): Promise<CustomerModel[]>;
    getCustomerById(id: number): Promise<CustomerModel | null>;
    createCustomer(dto: CreateCustomerDto): Promise<CustomerModel | null>;
    deleteCustomer(id: number): Promise<CustomerModel | null>;
    updateCustomerDiscount(dto: UpdateCustomerDiscountDto): Promise<CustomerModel | null>;
}
