import {CustomerModel} from "../../../infrastructure/db/models/CustomerModel/CustomerModel";
import {CreateCustomerDto} from "./dto/CreateCustomerDto";
import {UpdateDiscountDto} from "./dto/UpdateDiscountDto";

export interface ICustomerRepository {
    // create(dto: CreateUserDto): Promise<User>;
    getAll(): Promise<CustomerModel[]>;
    getById(id: number): Promise<CustomerModel | null>;
    create(dto: CreateCustomerDto): Promise<CustomerModel | null>;
    // delete(id: number): Promise<void>;
    updateDiscount(dto: UpdateDiscountDto): Promise<CustomerModel | null>;
}
