import {Request, Response} from "express";
import {constants} from "http2";
import {SupplierService} from "../../../core/services/SupplierService/SupplierService";
import {SupplierModel} from "../../db/models/SupplierModel/SupplierModel";
import {CreateSupplierDto} from "../../../core/repositories/SupplierRepository/dto/CreateSupplierDto";

type SupplierShort = Pick<SupplierModel, 'id' | 'companyName' | 'phone' | 'email'>;

export class SupplierController {
    constructor(readonly supplierService: SupplierService) {}

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const suppliers: SupplierShort[] = (await this.supplierService.getAll())
                .map(({ id, companyName, email, phone }) => ({ id, companyName, email, phone }));
            res.status(constants.HTTP_STATUS_OK).json(suppliers)
            return
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: (e as Error).message});
            return
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const supplier = await this.supplierService.getById(Number(id))
            res.status(constants.HTTP_STATUS_OK).json(supplier)
            return
        } catch (e) {
            res.status(constants.HTTP_STATUS_NOT_FOUND).json({message: (e as Error).message});
            return
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const { supplier, branch, representative } = req.body;
            const newSupplier = await this.supplierService.create(new CreateSupplierDto(supplier, branch, representative));
            res.status(constants.HTTP_STATUS_CREATED).json({message: 'Клиент добавлен'})
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: (e as Error).message});
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            const {id} = req.params;
            await this.supplierService.delete(Number(id))
            res.status(constants.HTTP_STATUS_OK).json({message: 'Клиент успешно удалён'})
        } catch (e) {
            res.status(constants.HTTP_STATUS_NOT_FOUND).json({message: (e as Error).message})
        }
    }
}