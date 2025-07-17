import {OrderRepository} from "../db/repositories/OrderRepository";
import {OrderService} from "../../core/services/OrderService/OrderService";
import {OrderController} from "../controllers/OrderController/OrderController";
import {Response, Router, Request} from "express";
import {AuthMiddleware} from "../middlewares/AuthMiddleware";
import { RoleMiddleware } from "../middlewares/RoleMiddleware";

const orderController = new OrderController(new OrderService(new OrderRepository()));

const router = Router();

router.get('/', AuthMiddleware, RoleMiddleware(['admin', 'employee']), (req: Request, res: Response) => {
    orderController.getAllOrders(req, res);
});

router.get('/:id', AuthMiddleware, RoleMiddleware(['admin', 'employee']), (req: Request, res: Response) => {
    orderController.getOrderById(req, res);
});

router.post('/', AuthMiddleware, RoleMiddleware(['admin', 'employee']), (req: Request, res: Response) => {
    orderController.createOrder(req, res)
})

router.patch('/:id', AuthMiddleware, RoleMiddleware(['admin', 'employee']), (req: Request, res: Response) => {
    orderController.updateStatusOrder(req, res)
})

router.delete('/:id', AuthMiddleware, RoleMiddleware(['admin']), (req: Request, res: Response) => {
    orderController.deleteOrder(req, res)
})

export default router;