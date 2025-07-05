import {constants} from "http2";
import {Request, Response} from "express";
import {CustomerService} from "../../../core/services/CustomerService/CustomerService";

export class CustomerController {
    constructor(readonly customerService: CustomerService) {}

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const customers = await this.customerService.getAll();
            res.status(constants.HTTP_STATUS_OK).json(customers)
            return
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: (e as Error).message});
            return
        }
    }
}