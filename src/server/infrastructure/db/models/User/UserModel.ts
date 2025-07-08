import {Table, Column, Model, PrimaryKey, AutoIncrement, Default, ForeignKey, BelongsTo} from 'sequelize-typescript';
import { UserRole } from "../../../../core/models/User/User";
import {SupplierModel} from "../SupplierModel/SupplierModel";

@Table({ tableName: 'users', timestamps: false, underscored: true })
export class UserModel extends Model {
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
    email!: string;

    @Column
    phone!: string;

    @Column
    password!: string;

    @Default("user")
    @Column
    role!: UserRole;

    @ForeignKey(() => SupplierModel)
    @Column
    supplierId?: number;

    @BelongsTo(() => SupplierModel, { foreignKey: 'supplierId', as: 'supplier' })
    supplier?: SupplierModel;
}
