import {SupplierModel} from "../models/SupplierModel/SupplierModel";
import {BranchModel} from "../models/BranchModel/BranchModel";
import {AddressModel} from "../models/AddressModel/AddressModel";
import {RepresentativeModel} from "../models/RepresentativeModel/RepresentativeModel";
import {sequelize} from "../orm/sequelize";
import {AddressMapper} from "../mappers/AddressMapper/AddressMapper";
import {RepresentativeMapper} from "../mappers/RepresentativeMapper/RepresentativeMapper";
import {BranchMapper} from "../mappers/BranchMapper/BranchMapper";
import {ISupplierRepository} from "../../../core/repositories/SupplierRepository/ISupplierRepository";
import {CreateSupplierDto} from "../../../core/repositories/SupplierRepository/dto/CreateSupplierDto";
import {SupplierMapper} from "../mappers/SupplierMapper/SupplierMapper";
import {logger} from "../../../logger";

export class SupplierRepositoryPostgres implements ISupplierRepository {
    async getAll(): Promise<SupplierModel[]> {
        const suppliersModels = await SupplierModel.findAll();
        return suppliersModels;
    }

    async getById(id: number): Promise<SupplierModel | null> {
        const suppliersModels = await SupplierModel.findByPk(id ,{
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
        return suppliersModels;
    }

    async create(dto: CreateSupplierDto): Promise<SupplierModel | null> {
        try {
            const result = await sequelize.transaction(async (trx) => {
                const addressActual = await AddressModel.create(
                    AddressMapper.toModel(dto.branch.addressActual),
                    {transaction: trx});
                const addressLegal = await AddressModel.create(
                    AddressMapper.toModel(dto.branch.addressLegal),
                    {transaction: trx});
                const supplier = await SupplierModel.create(
                    SupplierMapper.toModel(dto.supplier),
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
                        supplierId: supplier.id,
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
                        supplierId: supplier.id,
                    },
                    {transaction: trx}
                );
                logger.info(supplier)
                return supplier.id;
            })
            return await SupplierModel.findByPk(result)
        } catch (e) {
            return null;
        }
    }

    async delete(id: number): Promise<SupplierModel | null> {
        const supplier = await SupplierModel.findByPk(id)
        supplier ? supplier.destroy() : null;
        return supplier ? supplier : null;
    }
}