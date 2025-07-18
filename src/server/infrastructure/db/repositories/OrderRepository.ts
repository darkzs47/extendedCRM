import { CreateOrderDto } from "../../../core/repositories/OrderRepository/dto/CreateOrderDto";
import {IOrderRepository} from "../../../core/repositories/OrderRepository/OrderRepository";
import {OrderModel} from "../models/OrderModel/OrderModel";
import {ToolModel} from "../models/ToolModel/ToolModel";
import {OrderStatus} from "../../../types/OrdersTypes/OrderStatus";
import {sequelize} from "../orm/sequelize";
import {OrderToolModel} from "../models/OrderToolModel/OrderToolModel";
import dayjs from "dayjs";

export class OrderRepository implements IOrderRepository {
    async getAllOrders(): Promise<OrderModel[]> {
        const orders: OrderModel[] = await OrderModel.findAll({
            include: [
                {
                    model: ToolModel,
                    as: 'tools',
                    through: {
                        attributes: ['quantityTools'],
                    },
                }
            ]
        })
        return orders;
    }

    async getOrderById(id: number): Promise<OrderModel | null> {
        const order: OrderModel | null = await OrderModel.findByPk(id, {
            include: [
                {
                    model: ToolModel,
                    as: 'tools',
                    through: {
                        attributes: ['quantityTools'],
                    }
                }
            ]
        })

        return order;
    }

    async createOrder(order: CreateOrderDto): Promise<OrderModel  | null> {
        try {
            const result: number = await sequelize.transaction(async (trx) => {
                const newOrder: OrderModel = await OrderModel.create(
                    {
                        finalPrice: order.finalPrice,
                        customerId: order.customerId,
                    },
                    { transaction: trx }
                );
                for (const {toolId, quantity} of order.tools) {
                    await OrderToolModel.create(
                        {
                            toolId: toolId,
                            orderId: newOrder.id,
                            quantityTools: quantity,
                        },
                        { transaction: trx }
                    );
                }
                return newOrder.id
            })
            return OrderModel.findByPk(result);
        } catch (e) {
            return null;
        }
    }

    async updateOrderStatus(id: number, status: OrderStatus): Promise<OrderModel | null> {
        const order: OrderModel | null = await OrderModel.findByPk(id)
        order ? await order.update({
            status: status,
            completedAt: new Date(),
        }) : null;
        return order;
    }

    async deleteOrder(id: number): Promise<OrderModel | null> {
        const order: OrderModel | null = await OrderModel.findByPk(id)
        order ? await order.destroy() : null
        return order;
    }

}