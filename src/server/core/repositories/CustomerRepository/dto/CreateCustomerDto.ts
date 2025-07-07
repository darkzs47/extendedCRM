import {Representative} from "../../../models/Representative/Representative";
import {Branch} from "../../../models/Branch/Branch";
import {Customer} from "../../../models/Customer/Customer";

export class CreateCustomerDto {
    constructor(
        readonly customer: Customer,
        readonly branch: Branch,
        readonly representative: Representative,
    ) {    }
}