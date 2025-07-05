import {AutoIncrement, BelongsTo, Column, HasMany, Model, PrimaryKey, Table} from "sequelize-typescript";
import {BranchModel} from "../BranchModel/BranchModel";

@Table({ tableName: 'addresses', timestamps: false, underscored: true })
export class AddressModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Column
    country!: string;

    @Column
    region!: string;

    @Column
    city!: string;

    @Column
    street!: number;

    @Column
    house!: number;

    @Column
    building?: number;

    @Column
    postCode!: number;

    @HasMany(() => BranchModel, { foreignKey: 'addressActualId' })
    actualAddressBranches!: BranchModel[];

    @HasMany(() => BranchModel, { foreignKey: 'addressLegalId' })
    legalAddressBranches!: BranchModel[];
}