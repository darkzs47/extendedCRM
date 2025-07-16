import {ICustomerRepository} from "../../repositories/CustomerRepository/ICustomerRepository";
import {CustomerModel} from "../../../infrastructure/db/models/CustomerModel/CustomerModel";
import {CreateCustomerDto} from "../../repositories/CustomerRepository/dto/CreateCustomerDto";
import {UpdateCustomerDiscountDto} from "../../repositories/CustomerRepository/dto/UpdateCustomerDiscountDto";

export class CustomerService {

    constructor(readonly customerRepository: ICustomerRepository) {    }

    async getAllCustomers(): Promise<CustomerModel[]> {
        const customers: CustomerModel[] = await this.customerRepository.getAllCustomers();
        return customers;
    }

    async getCustomerById(id: number): Promise<CustomerModel> {
        const customer: CustomerModel | null = await this.customerRepository.getCustomerById(id)
        if (!customer) throw new Error(`Клиент не найден`);
        return customer;
    }

    async createCustomer(dto: CreateCustomerDto): Promise<CustomerModel> {
        const newCustomer: CustomerModel | null = await this.customerRepository.createCustomer(dto);
        if (!newCustomer) throw new Error(`Клиент не создан`);
        return newCustomer;
    }

    async updateCustomerDiscount(dto: UpdateCustomerDiscountDto): Promise<CustomerModel> {
        const customer: CustomerModel | null = await this.customerRepository.updateCustomerDiscount(dto);
        if (!customer) throw new Error(`Персональная скидка клиента не обновлена`);
        return customer;
    }

    async deleteCustomer(id: number): Promise<CustomerModel> {
        const customer: CustomerModel | null = await this.customerRepository.deleteCustomer(id);
        if (!customer) throw new Error(`Не удалось удалить клиента`);
        return customer;
    }
}