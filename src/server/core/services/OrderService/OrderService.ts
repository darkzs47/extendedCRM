import {IOrderRepository} from "../../repositories/OrderRepository/OrderRepository";
import {OrderModel} from "../../../infrastructure/db/models/OrderModel/OrderModel";
import {CreateOrderDto} from "../../repositories/OrderRepository/dto/CreateOrderDto";
import {OrderStatus} from "../../../types/OrdersTypes/OrderStatus";
import dayjs from 'dayjs';
import {SeasonCoefficientsService} from "../CoefficientsService/SeasonCoefficientsService";
import {CustomerService} from "../CustomerService/CustomerService";
import {logger} from "../../../logger";

export class OrderService {
    constructor(
        readonly OrderRepository: IOrderRepository,
        readonly SeasonCoefficientsService: SeasonCoefficientsService,
        readonly CustomerService: CustomerService,
    ) {}

    getCurrentSeasonName(date = dayjs()): string {
        const currentMonth = date.month();
        if (currentMonth >= 2 && currentMonth <= 4) return 'Весна';
        if (currentMonth >= 5 && currentMonth <= 7) return 'Лето';
        if (currentMonth >= 8 && currentMonth <= 10) return 'Осень';
        return 'Зима';
    }

    getSumTools(tools: object): number {
        Object.entries(tools).forEach(([key, value]) => {
            console.log(key, value);
        })
        return 1
    }

    async getAllOrders(): Promise<OrderModel[]> {
        const orders: OrderModel[] = await this.OrderRepository.getAllOrders();
        return orders;
    }

    async getOrderById(id: number): Promise<OrderModel | null> {
        const order: OrderModel | null = await this.OrderRepository.getOrderById(id)
        if (!order) throw new Error("Не удалось найти заказ");
        return order
    }

    async createOrder(tools: object, customerId: number): Promise<OrderModel[] | null> {
        const sumTools: number = this.getSumTools(tools)
        const currentSeason: string = this.getCurrentSeasonName()
        const currentSeasonCoefficient: number = await this.SeasonCoefficientsService.getSeasonCoefficientByName(currentSeason)
        const customerDiscount: number = await this.CustomerService.getCustomerDiscount(customerId)
        const order: OrderModel[] | null = await this.OrderRepository.getAllOrders()
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