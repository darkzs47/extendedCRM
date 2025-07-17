import {Request, Response} from "express";
import {OrderService} from "../../../core/services/OrderService/OrderService";
import {constants} from "http2";
import {OrderModel} from "../../db/models/OrderModel/OrderModel";

export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    async getAllOrders(req: Request, res: Response): Promise<void> {
        try {
            const orders: OrderModel[] = await this.orderService.getAllOrders();
            res.status(constants.HTTP_STATUS_OK).json(orders);
            return
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: "Не удалось получить информацию о заказах"})
            return;
        }
    }

    async getOrderById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const order: OrderModel | null = await this.orderService.getOrderById(Number(id));
            res.status(constants.HTTP_STATUS_OK).json(order);
            return
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: "Не удалось получить информацию о заказе"})
            return;
        }
    }

    async createOrder(req: Request, res: Response): Promise<void> {
        try {

        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: "Не удалось добавить заказ"})
            return;
        }
    }

    async updateStatusOrder(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const { status } = req.body
            const orderUpdated: OrderModel | null = await this.orderService.updateStatusOrder(Number(id), status);
            res.status(constants.HTTP_STATUS_OK).json();
            return
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: "Не удалось изменить статус заказа"})
            return;
        }
    }

    async deleteOrder(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await this.orderService.deleteOrder(Number(id))
            res.status(constants.HTTP_STATUS_OK).json({message: "Заказ успешно удалён"})
            return
        } catch (e) {
            res.status(constants.HTTP_STATUS_CONFLICT).json({message: "Не удалось удалить заказ"})
            return;
        }
    }
}