import {ICustomerRepository} from "../../../core/repositories/CustomerRepository/ICustomerRepository";
import {CustomerModel} from "../models/CustomerModel/CustomerModel";
import {BranchModel} from "../models/BranchModel/BranchModel";
import {AddressModel} from "../models/AddressModel/AddressModel";
import {RepresentativeModel} from "../models/RepresentativeModel/RepresentativeModel";

export class CustomerRepositoryPostgres implements ICustomerRepository {
    async getAll(): Promise<CustomerModel[]> {
        const customersModels = await CustomerModel.findAll({
            include: [
                {
                    model: BranchModel,
                    as: 'mainBranch',
                    include: [
                        { model: AddressModel, as: 'addressActual' },
                        { model: AddressModel, as: 'addressLegal' },
                        { model: RepresentativeModel, as: 'representative' },
                    ],
                },
                {
                    model: BranchModel, // все остальные филиалы
                    as: 'branches',
                    include: [
                        { model: AddressModel, as: 'addressActual' },
                        { model: AddressModel, as: 'addressLegal' },
                        { model: RepresentativeModel, as: 'representative' },
                    ],
                },
                {
                    model: RepresentativeModel, // прямые представители (не из филиалов)
                    as: 'representatives',
                },
            ],
        });
        return customersModels;
    }
}