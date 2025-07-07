import {CustomerModel} from "../../../infrastructure/db/models/CustomerModel/CustomerModel";
import {CreateCustomerDto} from "./dto/CreateCustomerDto";

export interface ICustomerRepository {
    // create(dto: CreateUserDto): Promise<User>;
    getAll(): Promise<CustomerModel[]>;
    getById(id: number): Promise<CustomerModel | null>;
    create(dto: CreateCustomerDto): Promise<CustomerModel | null>;
    // delete(id: number): Promise<void>;
    // update(dto: UpdateCusomerDto): Promise<void>;
}
