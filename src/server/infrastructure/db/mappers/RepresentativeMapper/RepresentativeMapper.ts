import {Representative} from "../../../../core/models/Representative/Representative";
import {RepresentativeModel} from "../../models/RepresentativeModel/RepresentativeModel";

export class RepresentativeMapper {
    static toModel(data: Representative): Partial<RepresentativeModel> {
        return {
            secondName: data.secondName,
            name: data.name,
            lastName: data.lastName,
            representativePosition: data.position,
            email: data.email,
            phone: data.phone,
            isMain: data.isMain,
        };
    }
}