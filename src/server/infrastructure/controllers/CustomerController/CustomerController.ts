import {constants} from "http2";
import {Request, Response} from "express";
import {CustomerService} from "../../../core/services/CustomerService/CustomerService";
import {CreateCustomerDto} from "../../../core/repositories/CustomerRepository/dto/CreateCustomerDto";
import {UpdateCustomerDiscountDto} from "../../../core/repositories/CustomerRepository/dto/UpdateCustomerDiscountDto";
import {CustomerShort} from "../../../types/CustomersTypes/Customer";
import {CustomerModel} from "../../db/models/CustomerModel/CustomerModel";
import {logger} from "../../../logger";


export class CustomerController {
    constructor(readonly customerService: CustomerService) {}

    async getAllCustomers(req: Request, res: Response): Promise<void> {
        try {
            const customers: CustomerShort[] = await this.customerService.getAllCustomers()
            res.status(constants.HTTP_STATUS_OK).json(customers)
            return
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: "Не удалось получить информацию о клиентах"});
            return
        }
    }

    async getCustomerById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const customer: CustomerModel = await this.customerService.getCustomerById(Number(id))
            res.status(constants.HTTP_STATUS_OK).json(customer)
            return
        } catch (e) {
            res.status(constants.HTTP_STATUS_NOT_FOUND).json({message: "Клиент получить информацию о клиенте"});
            return
        }
    }

    async createCustomer(req: Request, res: Response): Promise<void> {
        try {
            const { customer, branch, representative } = req.body;
            const newCustomer: CustomerModel = await this.customerService.createCustomer(new CreateCustomerDto(customer, branch, representative));
            res.status(constants.HTTP_STATUS_CREATED).json(newCustomer)
            return
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: "Не удалось добавить клиента"});
            return
        }
    }

    async updateCustomerDiscount(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { discount } = req.body;
            await this.customerService.updateCustomerDiscount(new UpdateCustomerDiscountDto(Number(id), discount));
            res.status(constants.HTTP_STATUS_OK).json({message: 'Персональная скидка изменена'})
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: "Не удалось изменить персональную скидку"})
        }
    }

    async deleteCustomer(req: Request, res: Response): Promise<void> {
        try {
            const {id} = req.params;
            await this.customerService.deleteCustomer(Number(id))
            res.status(constants.HTTP_STATUS_OK).json({message: 'Клиент успешно удалён'})
        } catch (e) {
            res.status(constants.HTTP_STATUS_NOT_FOUND).json({message: "Не удалось удалить клиента"})
        }
    }
}