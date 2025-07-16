import {ISupplierRepository} from "../../repositories/SupplierRepository/ISupplierRepository";
import {CreateSupplierDto} from "../../repositories/SupplierRepository/dto/CreateSupplierDto";
import {SupplierModel} from "../../../infrastructure/db/models/SupplierModel/SupplierModel";

export class SupplierService {

    constructor(readonly supplierRepository: ISupplierRepository) {    }

    async getAllSuppliers(): Promise<SupplierModel[]> {
        const suppliers: SupplierModel[] = await this.supplierRepository.getAllSuppliers();
        return suppliers;
    }

    async getSupplierById(id: number): Promise<SupplierModel> {
        const supplier: SupplierModel | null = await this.supplierRepository.getSupplierById(id)
        if (!supplier) throw new Error(`Поставщик не найден`);
        return supplier;
    }

    async createSupplier(dto: CreateSupplierDto): Promise<SupplierModel> {
        const newSupplier: SupplierModel | null = await this.supplierRepository.createSupplier(dto);
        if (!newSupplier) throw new Error(`Поставщик не создан`);
        return newSupplier;
    }

    async deleteSupplier(id: number): Promise<SupplierModel> {
        const supplier: SupplierModel | null = await this.supplierRepository.deleteSupplier(id);
        if (!supplier) throw new Error(`Не удалось удалить поставщика`);
        return supplier;
    }
}