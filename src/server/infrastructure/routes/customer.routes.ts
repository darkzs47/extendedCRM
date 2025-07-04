import {CustomerRepositoryPostgres} from "../db/repository/CustomerRepositoryPostgres";
import {Request, Response, Router} from "express";
import {AuthMiddleware} from "../middlewares/AuthMiddleware";
import {RoleMiddleware} from "../middlewares/RoleMiddleware";
import {CustomerService} from "../../core/services/CustomerService/CustomerService";
import {CustomerController} from "../controllers/Customer/CustomerController";

const postgresCustomerController = new CustomerController(new CustomerService(new CustomerRepositoryPostgres()));

const router = Router();

router.get('/',  (req: Request, res: Response) => {
    postgresCustomerController.getAll(req, res);
});

export default router;