import {ICustomerRepository} from "../../../core/repositories/CustomerRepository/ICustomerRepository";
import {CustomerModel} from "../models/CustomerModel/CustomerModel";
import {BranchModel} from "../models/BranchModel/BranchModel";
import {AddressModel} from "../models/AddressModel/AddressModel";
import {RepresentativeModel} from "../models/RepresentativeModel/RepresentativeModel";

export class CustomerRepositoryPostgres implements ICustomerRepository {
    async getAll(): Promise<CustomerModel[]> {
        const customersModels = await CustomerModel.findAll();
        return customersModels;
    }

    async getById(id: number): Promise<CustomerModel | null> {
        const customersModels = await CustomerModel.findByPk(id ,{
            include: [
                {
                    model: BranchModel,
                    as: 'branches',
                    include: [
                        { model: AddressModel, as: 'addressActual' },
                        { model: AddressModel, as: 'addressLegal' },
                        { model: RepresentativeModel, as: 'representative' },
                    ],
                },
                {
                    model: RepresentativeModel,
                    as: 'representatives',
                },
            ],
        });
        return customersModels;
    }
}