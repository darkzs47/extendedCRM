import type {CustomerFormValues} from "../../components/forms/Customer.tsx";
import type {BranchFormValues} from "../../components/forms/Branch.tsx";
import type {RepresentativeFormValues} from "../../components/forms/Representative.tsx";

export interface AddCustomerRequest {
    customer: CustomerFormValues,
    branch: BranchFormValues,
    representative: RepresentativeFormValues,
}