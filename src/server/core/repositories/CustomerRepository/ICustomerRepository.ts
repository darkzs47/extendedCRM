import {ICustomer} from "../../models/Customer/Customer";
import {CustomerModel} from "../../../infrastructure/db/models/CustomerModel/CustomerModel";

export interface ICustomerRepository {
    // create(dto: CreateUserDto): Promise<User>;
    getAll(): Promise<CustomerModel[]>;
    // delete(id: number): Promise<void>;
    // update(dto: UpdateCusomerDto): Promise<void>;
}
