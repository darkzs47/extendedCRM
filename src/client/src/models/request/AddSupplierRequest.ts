import type {BranchFormValues} from "../../components/forms/Branch.tsx";
import type {RepresentativeFormValues} from "../../components/forms/Representative.tsx";
import type {SupplierFormValues} from "../../components/forms/Supplier.tsx";

export interface AddSupplierRequest {
    supplier: SupplierFormValues,
    branch: BranchFormValues,
    representative: RepresentativeFormValues,
}