import {constants} from "http2";
import {Request, Response} from "express";
import {CustomerService} from "../../../core/services/CustomerService/CustomerService";
import {CustomerModel} from "../../db/models/CustomerModel/CustomerModel";
import {logger} from "../../../logger";
import {CreateCustomerDto} from "../../../core/repositories/CustomerRepository/dto/CreateCustomerDto";
import {UpdateDiscountDto} from "../../../core/repositories/CustomerRepository/dto/UpdateDiscountDto";

type CustomerShort = Pick<CustomerModel, 'id' | 'companyName' | 'phone' | 'email' | 'discount'>;

export class CustomerController {
    constructor(readonly customerService: CustomerService) {}

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const customers: CustomerShort[] = (await this.customerService.getAll())
                .map(({ id, companyName, email, phone, discount }) => ({ id, companyName, email, phone, discount }));
            res.status(constants.HTTP_STATUS_OK).json(customers)
            return
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: (e as Error).message});
            return
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const customer = await this.customerService.getById(Number(id))
            res.status(constants.HTTP_STATUS_OK).json(customer)
            return
        } catch (e) {
            res.status(constants.HTTP_STATUS_NOT_FOUND).json({message: (e as Error).message});
            return
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const { customer, branch, representative } = req.body;
            const newCustomer = await this.customerService.create(new CreateCustomerDto(customer, branch, representative));
            res.status(constants.HTTP_STATUS_CREATED).json({message: 'Клиент добавлен'})
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: (e as Error).message});
        }
    }

    async updateDiscount(req: Request, res: Response): Promise<void> {
        try {
            const {id} = req.params;
            const {discount } = req.body;
            await this.customerService.updateDiscount(new UpdateDiscountDto(Number(id), discount));
            res.status(constants.HTTP_STATUS_OK).json({message: 'Персональная скидка изменена'})
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: (e as Error).message})
        }
    }
}