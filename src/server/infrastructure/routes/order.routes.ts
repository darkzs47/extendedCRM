import {OrderRepository} from "../db/repositories/OrderRepository";
import {OrderService} from "../../core/services/OrderService/OrderService";
import {OrderController} from "../controllers/OrderController/OrderController";
import {Response, Router, Request} from "express";
import {AuthMiddleware} from "../middlewares/AuthMiddleware";
import { RoleMiddleware } from "../middlewares/RoleMiddleware";
import {CustomerService} from "../../core/services/CustomerService/CustomerService";
import {SeasonCoefficientsService} from "../../core/services/CoefficientsService/SeasonCoefficientsService";
import {SeasonCoefficientsRepository} from "../db/repositories/SeasonCoefficientsRepository";
import {CustomerRepository} from "../db/repositories/CustomerRepository";
import {ToolRepository} from "../db/repositories/ToolRepository";
import {ToolService} from "../../core/services/ToolService/ToolService";

const orderController = new OrderController(
    new OrderService(
        new OrderRepository(),
        new SeasonCoefficientsService(new SeasonCoefficientsRepository()),
        new CustomerService(new CustomerRepository()),
        new ToolService(new ToolRepository())
    ));

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