import {CustomerRepositoryPostgres} from "../db/repository/CustomerRepositoryPostgres";
import {Request, Response, Router} from "express";
import {AuthMiddleware} from "../middlewares/AuthMiddleware";
import {RoleMiddleware} from "../middlewares/RoleMiddleware";
import {CustomerService} from "../../core/services/CustomerService/CustomerService";
import {CustomerController} from "../controllers/Customer/CustomerController";

const postgresCustomerController = new CustomerController(new CustomerService(new CustomerRepositoryPostgres()));

const router = Router();

router.get('/', AuthMiddleware, RoleMiddleware(['admin', 'employee']), (req: Request, res: Response) => {
    postgresCustomerController.getAll(req, res);
});

router.get('/:id', AuthMiddleware, RoleMiddleware(['admin', 'employee']), (req: Request, res: Response) => {
    postgresCustomerController.getById(req, res)
})

router.post('/', AuthMiddleware, RoleMiddleware(['admin', 'employee']), (req, res) => {
    postgresCustomerController.create(req, res)
})

router.patch('/:id', AuthMiddleware, RoleMiddleware(['admin', 'employee']), (req, res) => {
    postgresCustomerController.updateDiscount(req, res)
})

router.delete('/:id', AuthMiddleware, RoleMiddleware(['admin']), (req, res) => {
    postgresCustomerController.delete(req, res)
})

export default router;