import {CustomerModel} from "../../../infrastructure/db/models/CustomerModel/CustomerModel";
import {CreateCustomerDto} from "./dto/CreateCustomerDto";
import {UpdateDiscountDto} from "./dto/UpdateDiscountDto";

export interface ICustomerRepository {
    getAll(): Promise<CustomerModel[]>;
    getById(id: number): Promise<CustomerModel | null>;
    create(dto: CreateCustomerDto): Promise<CustomerModel | null>;
    delete(id: number): Promise<CustomerModel | null>;
    updateDiscount(dto: UpdateDiscountDto): Promise<CustomerModel | null>;
}
