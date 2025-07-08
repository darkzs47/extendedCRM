import {AutoIncrement, Column, HasMany, Model, PrimaryKey, Table} from "sequelize-typescript";
import {BranchModel} from "../BranchModel/BranchModel";
import {RepresentativeModel} from "../RepresentativeModel/RepresentativeModel";

@Table({ tableName: 'suppliers', timestamps: false, underscored: true })
export class SupplierModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Column
    companyName!: string;

    @Column
    legalForm!: string;

    @Column
    inn!: string;

    @Column
    kpp!: string;

    @Column
    ogrn!: string;

    @Column
    email!: string;

    @Column
    phone!: string;


    @HasMany(() => BranchModel, { foreignKey: 'supplierId', as: 'branches' })
    branches!: BranchModel[];

    @HasMany(() => RepresentativeModel, { foreignKey: 'supplierId', as: 'representatives' })
    representatives!: RepresentativeModel[];
}
