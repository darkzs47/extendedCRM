import {CreateSupplierDto} from "./dto/CreateSupplierDto";
import {SupplierModel} from "../../../infrastructure/db/models/SupplierModel/SupplierModel";

export interface ISupplierRepository {
    getAllSuppliers(): Promise<SupplierModel[]>;
    getSupplierById(id: number): Promise<SupplierModel | null>;
    createSupplier(dto: CreateSupplierDto): Promise<SupplierModel | null>;
    deleteSupplier(id: number): Promise<SupplierModel | null>;
}
