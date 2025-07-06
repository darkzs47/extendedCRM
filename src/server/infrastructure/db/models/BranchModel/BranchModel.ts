import {AutoIncrement, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {CustomerModel} from "../CustomerModel/CustomerModel";
import {RepresentativeModel} from "../RepresentativeModel/RepresentativeModel";
import {AddressModel} from "../AddressModel/AddressModel";

@Table({ tableName: 'branches', timestamps: false, underscored: true })
export class BranchModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Column
    name!: string;

    @Column
    phone!: string;

    @Column
    email!: string;

    @ForeignKey(() => AddressModel)
    @Column
    addressActualId!: number;

    @BelongsTo(() => AddressModel, { foreignKey: 'addressActualId', as: 'addressActual' })
    addressActual!: AddressModel;

    @ForeignKey(() => AddressModel)
    @Column
    addressLegalId!: number;

    @BelongsTo(() => AddressModel, { foreignKey: 'addressLegalId', as: 'addressLegal' })
    addressLegal!: AddressModel;

    @ForeignKey(() => RepresentativeModel)
    @Column
    representativeId!: number;

    @BelongsTo(() => RepresentativeModel, { foreignKey: 'representativeId', as: 'representative' })
    representative!: RepresentativeModel;

    @ForeignKey(() => CustomerModel)
    @Column
    customerId!: number;

    @BelongsTo(() => CustomerModel, { foreignKey: 'customerId', as: 'customer' })
    customer!: CustomerModel;

    @Column
    supplierId?: number;

    @Column
    isMain!: boolean;
}