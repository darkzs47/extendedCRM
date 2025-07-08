import type {BranchFormValues} from "../../layouts/BranchForm.tsx";
import type {RepresentativeFormValues} from "../../layouts/RepresentativeForm.tsx";
import type {SupplierFormValues} from "../../layouts/SupplierForm.tsx";

export interface AddSupplierRequest {
    supplier: SupplierFormValues,
    branch: BranchFormValues,
    representative: RepresentativeFormValues,
}