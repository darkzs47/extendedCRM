import {Request, Response} from "express";
import {constants} from "http2";
import {SupplierService} from "../../../core/services/SupplierService/SupplierService";
import {CreateSupplierDto} from "../../../core/repositories/SupplierRepository/dto/CreateSupplierDto";
import {SupplierShort} from "../../../types/SupplierTypes/Supplier";
import {SupplierModel} from "../../db/models/SupplierModel/SupplierModel";


export class SupplierController {
    constructor(readonly supplierService: SupplierService) {}

    async getAllSuppliers(req: Request, res: Response): Promise<void> {
        try {
            const suppliers: SupplierShort[] = await this.supplierService.getAllSuppliers()
            res.status(constants.HTTP_STATUS_OK).json(suppliers)
            return
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: "Не удалось получить информацию о поставщиках"});
            return
        }
    }

    async getSupplierById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const supplier: SupplierModel = await this.supplierService.getSupplierById(Number(id))
            res.status(constants.HTTP_STATUS_OK).json(supplier)
            return
        } catch (e) {
            res.status(constants.HTTP_STATUS_NOT_FOUND).json({message: "Не удалось получить информацию о поставщике"});
            return
        }
    }

    async createSupplier(req: Request, res: Response): Promise<void> {
        try {
            const { supplier, branch, representative } = req.body;
            const newSupplier: SupplierModel = await this.supplierService.createSupplier(new CreateSupplierDto(supplier, branch, representative));
            res.status(constants.HTTP_STATUS_CREATED).json(newSupplier)
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: "Не удалось добавить поставщика"});
        }
    }

    async deleteSupplier(req: Request, res: Response): Promise<void> {
        try {
            const {id} = req.params;
            await this.supplierService.deleteSupplier(Number(id))
            res.status(constants.HTTP_STATUS_OK).json({message: 'Поставщик успешно удалён'})
        } catch (e) {
            res.status(constants.HTTP_STATUS_NOT_FOUND).json({message: "Не удалось удалить поставщика"})
        }
    }
}