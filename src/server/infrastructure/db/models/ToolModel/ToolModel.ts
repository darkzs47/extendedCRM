import {
    AutoIncrement,
    BelongsTo, BelongsToMany,
    Column,
    Default,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import {UserRole} from "../../../../core/models/User/User";
import {SupplierModel} from "../SupplierModel/SupplierModel";
import {CategoryModel} from "../CategoryModel/CategoryModel";
import {OrderToolModel} from "../OrderToolModel/OrderToolModel";
import {OrderModel} from "../OrderModel/OrderModel";

@Table({ tableName: 'tools', timestamps: false, underscored: true })
export class ToolModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Column
    name!: string;

    @Column
    sellPrice!: number;

    @ForeignKey(() => CategoryModel)
    @Column
    categoryId!: number;

    @BelongsTo(() => CategoryModel, { foreignKey: 'categoryId', as: 'category' })

    @Column
    purchasePrice?: number;

    @ForeignKey(() => SupplierModel)
    @Column
    supplierId?: number;

    @BelongsTo(() => SupplierModel, { foreignKey: 'supplierId', as: 'supplier' })
    supplier?: SupplierModel;

    @HasMany(() => OrderToolModel, { foreignKey: 'orderId' })
    orderTools!: OrderToolModel[];

    @BelongsToMany(() => OrderModel, {
        through: () => OrderToolModel,
        foreignKey: 'toolId',
        otherKey: 'orderId',
        as: 'orders',
    })
    orders!: OrderModel[];
}
