import {AutoIncrement, BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table} from "sequelize-typescript";
import {BranchModel} from "../BranchModel/BranchModel";
import {CustomerModel} from "../CustomerModel/CustomerModel";
import {SupplierModel} from "../SupplierModel/SupplierModel";

@Table({ tableName: 'representatives', timestamps: false, underscored: true })
export class RepresentativeModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Column
    secondName!: string;

    @Column
    name!: string;

    @Column
    lastName!: string;

    @Column
    representativePosition!: string;

    @Column
    phone!: string;

    @Column
    email!: string;

    @Column
    isMain!: boolean;

    @ForeignKey(() => CustomerModel)
    @Column
    customerId?: number;

    @BelongsTo(() => CustomerModel, { foreignKey: 'customerId', as: 'customer' })
    customer?: CustomerModel;

    @HasMany(() => BranchModel, { foreignKey: 'representativeId' })
    branches!: BranchModel[];

    @ForeignKey(() => SupplierModel)
    @Column
    supplierId?: number;

    @BelongsTo(() => SupplierModel, { foreignKey: 'supplierId', as: 'supplier' })
    supplier?: SupplierModel;
}