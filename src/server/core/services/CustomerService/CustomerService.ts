import {ICustomerRepository} from "../../repositories/CustomerRepository/ICustomerRepository";
import {CustomerModel} from "../../../infrastructure/db/models/CustomerModel/CustomerModel";

export class CustomerService {

    constructor(readonly customerRepository: ICustomerRepository) {    }

    async getAll(): Promise<CustomerModel[]> {
        const customers = await this.customerRepository.getAll();
        return customers;
    }

    async getById(id: number): Promise<CustomerModel> {
        const customer = await this.customerRepository.getById(id)
        if (!customer) throw new Error(`Customer not found`);
        return customer;
    }
}