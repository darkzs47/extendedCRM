import { CreateOrderDto } from "../../../core/repositories/OrderRepository/dto/CreateOrderDto";
import {IOrderRepository} from "../../../core/repositories/OrderRepository/OrderRepository";
import {OrderModel} from "../models/OrderModel/OrderModel";
import {ToolModel} from "../models/ToolModel/ToolModel";
import {OrderStatus} from "../../../types/OrdersTypes/OrderStatus";

export class OrderRepository implements IOrderRepository {
    async getAllOrders(): Promise<OrderModel[]> {
        const orders: OrderModel[] = await OrderModel.findAll({
            include: [
                {
                    model: ToolModel,
                    as: 'tools',
                    through: {
                        attributes: ['quantityTools', 'toolsPrice'],
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
                        attributes: ['quantityTools', 'toolsPrice'],
                    }
                }
            ]
        })

        return order;
    }

    async createOrder(dto: CreateOrderDto): Promise<OrderModel | null> {
        const order: OrderModel | null = await OrderModel.findByPk(1)
        return order;
    }

    async updateOrderStatus(id: number, status: OrderStatus): Promise<OrderModel | null> {
        const order: OrderModel | null = await OrderModel.findByPk(id)
        order ? await order.update({
            status: status
        }) : null;
        return order;
    }

    async deleteOrder(id: number): Promise<OrderModel | null> {
        const order: OrderModel | null = await OrderModel.findByPk(id)
        order ? await order.destroy() : null
        return order;
    }

}