import {constants} from "http2";
import {Request, Response} from "express";
import {CustomerService} from "../../../core/services/CustomerService/CustomerService";
import {CustomerModel} from "../../db/models/CustomerModel/CustomerModel";

type CustomerShort = Pick<CustomerModel, 'id' | 'companyName' | 'phone' | 'email'>;

export class CustomerController {
    constructor(readonly customerService: CustomerService) {}

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const customers: CustomerShort[] = (await this.customerService.getAll())
                .map(({ id, companyName, email, phone }) => ({ id, companyName, email, phone }));
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
}