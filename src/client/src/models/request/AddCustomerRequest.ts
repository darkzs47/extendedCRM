import type {CustomerFormValues} from "../../layouts/CustomerForm.tsx";
import type {BranchFormValues} from "../../layouts/BranchForm.tsx";
import type {RepresentativeFormValues} from "../../layouts/RepresentativeForm.tsx";

export interface AddCustomerRequest {
    customer: CustomerFormValues,
    branch: BranchFormValues,
    representative: RepresentativeFormValues,
}