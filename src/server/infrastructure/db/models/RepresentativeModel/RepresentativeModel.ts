import {AutoIncrement, BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table} from "sequelize-typescript";
import {BranchModel} from "../BranchModel/BranchModel";
import {CustomerModel} from "../CustomerModel/CustomerModel";

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
    position!: string;

    @Column
    phone!: string;

    @Column
    email!: string;

    @Column
    isMain?: boolean;

    @ForeignKey(() => CustomerModel)
    @Column
    customerId?: number;

    // @ForeignKey(() => SupplierModel)
    @Column
    supplierId?: number;

    @HasMany(() => BranchModel, { foreignKey: 'representativeId' })
    branches!: BranchModel[];

    @BelongsTo(() => CustomerModel)
    customer?: CustomerModel;

    // @BelongsTo(() => SupplierModel)
    // supplier?: SupplierModel;
}