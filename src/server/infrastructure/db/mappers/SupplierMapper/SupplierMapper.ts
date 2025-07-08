import {Supplier} from "../../../../core/models/Supplier/Supplier";

export class SupplierMapper {
    static toModel(data: Supplier): Partial<SupplierMapper> {
        return {
            companyName: data.companyName,
            legalForm: data.legalForm,
            inn: data.inn,
            kpp: data.kpp,
            ogrn: data.ogrn,
            email: data.email,
            phone: data.phone,
        };
    }
}