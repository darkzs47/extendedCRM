import {Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript';
import {BranchModel} from "../BranchModel/BranchModel";
import {RepresentativeModel} from "../RepresentativeModel/RepresentativeModel";

@Table({ tableName: 'customers', timestamps: false, underscored: true })
export class CustomerModel extends Model {
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

    @Column
    discount!: number;

    @HasMany(() => BranchModel, { foreignKey: 'customerId', as: 'branches' })
    branches!: BranchModel[];

    @HasMany(() => RepresentativeModel, { foreignKey: 'customerId', as: 'representatives' })
    representatives!: RepresentativeModel[];
}
