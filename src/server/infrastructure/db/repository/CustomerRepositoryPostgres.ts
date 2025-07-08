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
import {UpdateDiscountDto} from "../../../core/repositories/CustomerRepository/dto/UpdateDiscountDto";

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

    async create(dto: CreateCustomerDto): Promise<CustomerModel | null> {
        try {
            const result = await sequelize.transaction(async (trx) => {
                const addressActual = await AddressModel.create(
                    AddressMapper.toModel(dto.branch.addressActual),
                    {transaction: trx});
                const addressLegal = await AddressModel.create(
                    AddressMapper.toModel(dto.branch.addressLegal),
                    {transaction: trx});
                const customer = await CustomerModel.create(
                    CustomerMapper.toModel(dto.customer),
                    {transaction: trx}
                );
                const representativeShortModel = RepresentativeMapper.toModel(dto.representative);
                const representative = await RepresentativeModel.create(
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
                const branchShortModel = BranchMapper.toModel(dto.branch);
                const branch = await BranchModel.create(
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
            logger.error(e);
            return null;
        }
    }

    async updateDiscount(dto: UpdateDiscountDto): Promise<CustomerModel | null> {
        try {
            const customer = await CustomerModel.findByPk(dto.id)
            return customer ? customer.update(
                {discount: dto.discount}
            ) : null
        } catch (e) {
            logger.error(e);
            return null;
        }
    }

    async delete(id: number): Promise<CustomerModel | null> {
        const customer = await CustomerModel.findByPk(id)
        logger.info(customer)
        logger.info(id)
        customer ? customer.destroy() : null;
        return customer ? customer : null;
    }
}