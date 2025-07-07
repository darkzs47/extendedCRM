import {Branch} from "../../../../core/models/Branch/Branch";
import {BranchModel} from "../../models/BranchModel/BranchModel";

export class BranchMapper {
    static toModel(data: Branch): Partial<BranchModel> {
        return {
            name: data.name,
            phone: data.phone,
            email: data.email,
            isMain: data.isMain,
        };
    }
}