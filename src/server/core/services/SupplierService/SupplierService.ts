import {ISupplierRepository} from "../../repositories/SupplierRepository/ISupplierRepository";
import {CreateSupplierDto} from "../../repositories/SupplierRepository/dto/CreateSupplierDto";
import {SupplierModel} from "../../../infrastructure/db/models/SupplierModel/SupplierModel";

export class SupplierService {

    constructor(readonly supplierRepository: ISupplierRepository) {    }

    async getAll(): Promise<SupplierModel[]> {
        const suppliers = await this.supplierRepository.getAll();
        return suppliers;
    }

    async getById(id: number): Promise<SupplierModel> {
        const supplier = await this.supplierRepository.getById(id)
        if (!supplier) throw new Error(`Supplier not found`);
        return supplier;
    }

    async create(dto: CreateSupplierDto): Promise<SupplierModel> {
        const newSupplier = await this.supplierRepository.create(dto);
        if (!newSupplier) throw new Error(`Create error`);
        return newSupplier;
    }

    async delete(id: number): Promise<void> {
        const deleteResult = await this.supplierRepository.delete(id);
        if (!deleteResult) throw new Error(`Supplier not found`);
        return;
    }
}