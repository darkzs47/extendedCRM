import {AutoIncrement, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {OrderModel} from "../OrderModel/OrderModel";
import {ToolModel} from "../ToolModel/ToolModel";

@Table({ tableName: 'orders_tools', timestamps: false, underscored: true })
export class OrderToolModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @ForeignKey(() => OrderModel)
    @Column
    orderId!: number;

    @BelongsTo(() => OrderModel, { foreignKey: 'orderId', as: 'order' })
    order!: OrderModel;

    @ForeignKey(() => ToolModel)
    @Column
    toolId!: number;

    @BelongsTo(() => ToolModel, { foreignKey: 'toolId', as: 'tool' })
    tool!: ToolModel;

    @Column
    toolsPrice!: number;

    @Column
    quantityTools!: number;
}