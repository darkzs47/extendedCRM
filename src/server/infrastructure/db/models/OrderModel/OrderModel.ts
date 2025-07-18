import {
    AutoIncrement,
    BelongsTo,
    BelongsToMany,
    Column, CreatedAt, Default,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import {CustomerModel} from "../CustomerModel/CustomerModel";
import {OrderToolModel} from "../OrderToolModel/OrderToolModel";
import {ToolModel} from "../ToolModel/ToolModel";
import {OrderStatus} from "../../../../types/OrdersTypes/OrderStatus";

@Table({ tableName: 'orders', timestamps: false, underscored: true })
export class OrderModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Default('В работе')
    @Column
    status!: OrderStatus;

    @Column
    finalPrice!: number;

    @CreatedAt
    @Column
    createdAt?: Date;

    @Column
    completedAt?: Date;

    @ForeignKey(() => CustomerModel)
    @Column
    customerId!: string;

    @BelongsTo(() => CustomerModel, { foreignKey: 'customerId', as: 'customer' })
    customer!: CustomerModel;

    @HasMany(() => OrderToolModel, { foreignKey: 'orderId' })
    orderTools!: OrderToolModel[];

    @BelongsToMany(() => ToolModel, {
        through: () => OrderToolModel,
        foreignKey: 'orderId',
        otherKey: 'toolId',
        as: 'tools',
    })
    tools!: ToolModel[];
}
