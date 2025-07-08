import {CreateSupplierDto} from "./dto/CreateSupplierDto";
import {SupplierModel} from "../../../infrastructure/db/models/SupplierModel/SupplierModel";

export interface ISupplierRepository {
    getAll(): Promise<SupplierModel[]>;
    getById(id: number): Promise<SupplierModel | null>;
    create(dto: CreateSupplierDto): Promise<SupplierModel | null>;
    delete(id: number): Promise<SupplierModel | null>;
}
