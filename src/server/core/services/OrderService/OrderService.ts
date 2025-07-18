import {IOrderRepository} from "../../repositories/OrderRepository/OrderRepository";
import {OrderModel} from "../../../infrastructure/db/models/OrderModel/OrderModel";
import {CreateOrderDto} from "../../repositories/OrderRepository/dto/CreateOrderDto";
import {OrderStatus} from "../../../types/OrdersTypes/OrderStatus";
import dayjs from 'dayjs';
import {SeasonCoefficientsService} from "../CoefficientsService/SeasonCoefficientsService";
import {CustomerService} from "../CustomerService/CustomerService";
import {ToolService} from "../ToolService/ToolService";
import {ToolModel} from "../../../infrastructure/db/models/ToolModel/ToolModel";
import {ToolsInOrderRequest} from "../../../types/OrdersTypes/OrderToolsRequest";
import {logger} from "../../../logger";

export class OrderService {
    constructor(
        readonly orderRepository: IOrderRepository,
        readonly seasonCoefficientsService: SeasonCoefficientsService,
        readonly customerService: CustomerService,
        readonly toolService: ToolService,
    ) {}

    getCurrentSeasonName(date = dayjs()): string {
        const currentMonth = date.month();
        if (currentMonth >= 2 && currentMonth <= 4) return 'Весна';
        if (currentMonth >= 5 && currentMonth <= 7) return 'Лето';
        if (currentMonth >= 8 && currentMonth <= 10) return 'Осень';
        return 'Зима';
    }

    async getSumTools(tools: ToolsInOrderRequest): Promise<number> {
        let sum: number = 0;
        for (const {toolId, quantity} of tools) {
            const tool: ToolModel | null = await this.toolService.getToolById(Number(toolId))
            if (!tool) {
                throw new Error(`Инструмент не найден`);
            }
            const toolPriceInOrder: number = tool.sellPrice * quantity;
            sum += toolPriceInOrder;
        }
        return sum
    }

    async getAllOrders(): Promise<OrderModel[]> {
        const orders: OrderModel[] = await this.orderRepository.getAllOrders();
        return orders;
    }

    async getOrderById(id: number): Promise<OrderModel | null> {
        const order: OrderModel | null = await this.orderRepository.getOrderById(id)
        if (!order) throw new Error("Не удалось найти заказ");
        return order
    }

    async createOrder(tools: ToolsInOrderRequest, customerId: number): Promise<OrderModel | null> {
        const currentSeason: string = this.getCurrentSeasonName()
        const sumTools: number = await this.getSumTools(tools)
        const currentSeasonCoefficient: number = await this.seasonCoefficientsService.getSeasonCoefficientByName(currentSeason)
        const customerDiscount: number = await this.customerService.getCustomerDiscount(customerId)
        const priceWithDiscount: number = sumTools * currentSeasonCoefficient * (1 - customerDiscount)
        const order: CreateOrderDto = new CreateOrderDto(customerId, priceWithDiscount, tools)
        const newOrder: OrderModel | null = await this.orderRepository.createOrder(order)
        if (!newOrder) throw new Error("Не удалось создать заказ")
        return newOrder
    }

    async updateStatusOrder(id: number, status: OrderStatus): Promise<OrderModel | null> {
        const order: OrderModel | null = await this.orderRepository.updateOrderStatus(id, status);
        if (!order) throw new Error("Не удалось обновить статус заказа");
        return order;
    }

    async deleteOrder(id: number): Promise<OrderModel | null> {
        const order: OrderModel | null = await this.orderRepository.deleteOrder(id)
        if (!order) throw new Error("Не удалось удалить заказ");
        return order;
    }
}