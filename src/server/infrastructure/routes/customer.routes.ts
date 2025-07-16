import {CustomerRepository} from "../db/repositories/CustomerRepository";
import {Request, Response, Router} from "express";
import {AuthMiddleware} from "../middlewares/AuthMiddleware";
import {RoleMiddleware} from "../middlewares/RoleMiddleware";
import {CustomerService} from "../../core/services/CustomerService/CustomerService";
import {CustomerController} from "../controllers/Customer/CustomerController";

const customerController = new CustomerController(new CustomerService(new CustomerRepository()));

const router = Router();

router.get('/', AuthMiddleware, RoleMiddleware(['admin', 'employee']), (req: Request, res: Response) => {
    customerController.getAllCustomers(req, res);
});

router.get('/:id', AuthMiddleware, RoleMiddleware(['admin', 'employee']), (req: Request, res: Response) => {
    customerController.getCustomerById(req, res)
})

router.post('/', AuthMiddleware, RoleMiddleware(['admin', 'employee']), (req: Request, res: Response) => {
    customerController.createCustomer(req, res)
})

router.patch('/:id', AuthMiddleware, RoleMiddleware(['admin', 'employee']), (req: Request, res: Response) => {
    customerController.updateCustomerDiscount(req, res)
})

router.delete('/:id', AuthMiddleware, RoleMiddleware(['admin']), (req: Request, res: Response) => {
    customerController.deleteCustomer(req, res)
})

export default router;