import {Supplier} from "../../../models/Supplier/Supplier";
import {Representative} from "../../../models/Representative/Representative";
import {Branch} from "../../../models/Branch/Branch";

export class CreateSupplierDto {
    constructor(
        readonly supplier: Supplier,
        readonly branch: Branch,
        readonly representative: Representative,
    ) {    }
}