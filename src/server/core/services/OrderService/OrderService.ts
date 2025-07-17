import {IOrderRepository} from "../../repositories/OrderRepository/OrderRepository";
import {OrderModel} from "../../../infrastructure/db/models/OrderModel/OrderModel";
import {CreateOrderDto} from "../../repositories/OrderRepository/dto/CreateOrderDto";
import {OrderStatus} from "../../../types/OrdersTypes/OrderStatus";

export class OrderService {
    constructor(readonly OrderRepository: IOrderRepository) {}

    async getAllOrders(): Promise<OrderModel[]> {
        const orders: OrderModel[] = await this.OrderRepository.getAllOrders();
        return orders;
    }

    async getOrderById(id: number): Promise<OrderModel | null> {
        const order: OrderModel | null = await this.OrderRepository.getOrderById(id)
        if (!order) throw new Error("Не удалось найти заказ");
        return order
    }

    async createOrder(dto: CreateOrderDto): Promise<OrderModel | null> {
        const order: OrderModel | null = await this.OrderRepository.createOrder(dto)
        if (!order) throw new Error("Не удалось создать заказ")
        return order
    }

    async updateStatusOrder(id: number, status: OrderStatus): Promise<OrderModel | null> {
        const order: OrderModel | null = await this.OrderRepository.updateOrderStatus(id, status);
        if (!order) throw new Error("Не удалось обновить статус заказа");
        return order;
    }

    async deleteOrder(id: number): Promise<OrderModel | null> {
        const order: OrderModel | null = await this.OrderRepository.deleteOrder(id)
        if (!order) throw new Error("Не удалось удалить заказ");
        return order;
    }
}