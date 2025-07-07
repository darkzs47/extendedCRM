import {Customer} from "../../../../core/models/Customer/Customer";
import {CustomerModel} from "../../models/CustomerModel/CustomerModel";

export class CustomerMapper {
    static toModel(data: Customer): Partial<CustomerModel> {
        return {
            companyName: data.companyName,
            legalForm: data.legalForm,
            inn: data.inn,
            kpp: data.kpp,
            ogrn: data.ogrn,
            email: data.email,
            phone: data.phone,
            discount: data.discount,
        };
    }
}