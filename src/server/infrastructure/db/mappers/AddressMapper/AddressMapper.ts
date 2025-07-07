import {AddressModel} from "../../models/AddressModel/AddressModel";
import {Address} from "../../../../core/models/Address/Address";

export class AddressMapper {
    static toModel(data: Address): Partial<AddressModel> {
        return {
            country: data.country,
            region: data.region,
            city: data.city,
            street: data.street,
            house: data.house,
            building: data.building,
            postCode: data.postCode,
        };
    }
}