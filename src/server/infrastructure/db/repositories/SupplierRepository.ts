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

export class SupplierRepository implements ISupplierRepository {
    async getAllSuppliers(): Promise<SupplierModel[]> {
        const suppliers: SupplierModel[] = await SupplierModel.findAll();
        return suppliers;
    }

    async getSupplierById(id: number): Promise<SupplierModel | null> {
        const suppliers: SupplierModel | null = await SupplierModel.findByPk(id ,{
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
        return suppliers;
    }

    async createSupplier(dto: CreateSupplierDto): Promise<SupplierModel | null> {
        try {
            const result: number = await sequelize.transaction(async (trx) => {
                const addressActual: AddressModel = await AddressModel.create(
                    AddressMapper.toModel(dto.branch.addressActual),
                    {transaction: trx});
                const addressLegal: AddressModel = await AddressModel.create(
                    AddressMapper.toModel(dto.branch.addressLegal),
                    {transaction: trx});
                const supplier: SupplierModel = await SupplierModel.create(
                    SupplierMapper.toModel(dto.supplier),
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
                        supplierId: supplier.id,
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
                        supplierId: supplier.id,
                    },
                    {transaction: trx}
                );
                return supplier.id;
            })
            return await SupplierModel.findByPk(result)
        } catch (e) {
            return null;
        }
    }

    async deleteSupplier(id: number): Promise<SupplierModel | null> {
        const supplier: SupplierModel | null = await SupplierModel.findByPk(id)
        supplier ? await supplier.destroy() : null;
        return supplier;
    }
}