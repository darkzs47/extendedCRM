import {Request, Response, Router} from "express";
import {AuthMiddleware} from "../middlewares/AuthMiddleware";
import {RoleMiddleware} from "../middlewares/RoleMiddleware";
import {SupplierRepository} from "../db/repository/SupplierRepository";
import {SupplierService} from "../../core/services/SupplierService/SupplierService";
import {SupplierController} from "../controllers/Supplier/SupplierController";

const postgresSupplierController = new SupplierController(new SupplierService(new SupplierRepository()));

const router = Router();

router.get('/', AuthMiddleware, RoleMiddleware(['admin', 'employee']), (req: Request, res: Response) => {
    postgresSupplierController.getAll(req, res);
});

router.get('/:id', AuthMiddleware, RoleMiddleware(['admin', 'employee']), (req: Request, res: Response) => {
    postgresSupplierController.getById(req, res)
})

router.post('/', AuthMiddleware, RoleMiddleware(['admin', 'employee']), (req: Request, res: Response) => {
    postgresSupplierController.create(req, res)
})

router.delete('/:id', AuthMiddleware, RoleMiddleware(['admin']), (req: Request, res: Response) => {
    postgresSupplierController.delete(req, res)
})

export default router;