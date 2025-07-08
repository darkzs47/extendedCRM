import {ICustomerRepository} from "../../repositories/CustomerRepository/ICustomerRepository";
import {CustomerModel} from "../../../infrastructure/db/models/CustomerModel/CustomerModel";
import {CreateCustomerDto} from "../../repositories/CustomerRepository/dto/CreateCustomerDto";
import {UpdateDiscountDto} from "../../repositories/CustomerRepository/dto/UpdateDiscountDto";

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

    async create(dto: CreateCustomerDto): Promise<CustomerModel> {
        const newCustomer = await this.customerRepository.create(dto);
        if (!newCustomer) throw new Error(`Create error`);
        return newCustomer;
    }

    async updateDiscount(dto: UpdateDiscountDto): Promise<CustomerModel> {
        const customer = await this.customerRepository.updateDiscount(dto);
        if (!customer) throw new Error(`Customer not found`);
        return customer;
    }

    async delete(id: number): Promise<void> {
        const deleteResult = await this.customerRepository.delete(id);
        if (!deleteResult) throw new Error(`Customer not found`);
        return;
    }
}