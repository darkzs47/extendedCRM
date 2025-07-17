import {CreateOrderDto} from "./dto/CreateOrderDto";
import {OrderModel} from "../../../infrastructure/db/models/OrderModel/OrderModel";
import {OrderStatus} from "../../../types/OrdersTypes/OrderStatus";

export interface IOrderRepository {
    getAllOrders(): Promise<OrderModel[]>;
    getOrderById(id: number): Promise<OrderModel | null>;
    createOrder(dto: CreateOrderDto): Promise<OrderModel | null>;
    updateOrderStatus(id: number, status: OrderStatus): Promise<OrderModel | null>;
    deleteOrder(id: number): Promise<OrderModel | null>;
}