import {ICustomerRepository} from "../../../core/repositories/CustomerRepository/ICustomerRepository";
import {CustomerModel} from "../models/CustomerModel/CustomerModel";
import {BranchModel} from "../models/BranchModel/BranchModel";
import {AddressModel} from "../models/AddressModel/AddressModel";
import {RepresentativeModel} from "../models/RepresentativeModel/RepresentativeModel";
import {sequelize} from "../orm/sequelize";
import {CreateCustomerDto} from "../../../core/repositories/CustomerRepository/dto/CreateCustomerDto";
import {AddressMapper} from "../mappers/AddressMapper/AddressMapper";
import {CustomerMapper} from "../mappers/CustomerMapper/CustomerMapper";
import {RepresentativeMapper} from "../mappers/RepresentativeMapper/RepresentativeMapper";
import {BranchMapper} from "../mappers/BranchMapper/BranchMapper";
import {logger} from "../../../logger";
import {UpdateCustomerDiscountDto} from "../../../core/repositories/CustomerRepository/dto/UpdateCustomerDiscountDto";

export class CustomerRepository implements ICustomerRepository {
    async getAllCustomers(): Promise<CustomerModel[]> {
        const customers: CustomerModel[] = await CustomerModel.findAll();
        return customers;
    }

    async getCustomerById(id: number): Promise<CustomerModel | null> {
        const customers: CustomerModel | null = await CustomerModel.findByPk(id, {
            include: [
                {
                    model: BranchModel,
                    as: 'branches',
                    include: [
                        {model: AddressModel, as: 'addressActual'},
                        {model: AddressModel, as: 'addressLegal'},
                        {model: RepresentativeModel, as: 'representative'},
                    ],
                },
                {
                    model: RepresentativeModel,
                    as: 'representatives',
                },
            ],
        });
        return customers;
    }

    async createCustomer(dto: CreateCustomerDto): Promise<CustomerModel | null> {
        try {
            const result: number = await sequelize.transaction(async (trx) => {
                const addressActual: AddressModel = await AddressModel.create(
                    AddressMapper.toModel(dto.branch.addressActual),
                    {transaction: trx});
                const addressLegal: AddressModel = await AddressModel.create(
                    AddressMapper.toModel(dto.branch.addressLegal),
                    {transaction: trx});
                const customer: CustomerModel = await CustomerModel.create(
                    CustomerMapper.toModel(dto.customer),
                    {transaction: trx}
                );
                const representativeShortModel: Partial<RepresentativeModel> = RepresentativeMapper.toModel(dto.representative);
                const representative: RepresentativeModel = await RepresentativeModel.create(
                    {
                        secondName: representativeShortModel.secondName,
                        name: representativeShortModel.name,
                        lastName: representativeShortModel.lastName,
                        representativePosition: representativeShortModel.representativePosition,
                        email: representativeShortModel.email,
                        phone: representativeShortModel.phone,
                        isMain: representativeShortModel.isMain,
                        customerId: customer.id,
                    },
                    {transaction: trx}
                );
                const branchShortModel: Partial<BranchModel> = BranchMapper.toModel(dto.branch);
                const branch: BranchModel = await BranchModel.create(
                    {
                        name: branchShortModel.name,
                        phone: branchShortModel.phone,
                        email: branchShortModel.email,
                        isMain: branchShortModel.isMain,
                        addressActualId: addressActual.id,
                        addressLegalId: addressLegal.id,
                        representativeId: representative.id,
                        customerId: customer.id,
                    },
                    {transaction: trx}
                );
                return customer.id;
            })
            return await CustomerModel.findByPk(result)
        } catch (e) {
            return null;
        }
    }

    async updateCustomerDiscount(dto: UpdateCustomerDiscountDto): Promise<CustomerModel | null> {
        const customer: CustomerModel | null = await CustomerModel.findByPk(dto.id)
        customer ? await customer.update(
            {discount: dto.discount}
        ) : null
        return customer
    }

    async deleteCustomer(id: number): Promise<CustomerModel | null> {
        const customer: CustomerModel | null = await CustomerModel.findByPk(id)
        customer ? await customer.destroy() : null;
        return customer
    }
}