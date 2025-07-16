import {Request, Response, Router} from "express";
import {AuthMiddleware} from "../middlewares/AuthMiddleware";
import {RoleMiddleware} from "../middlewares/RoleMiddleware";
import {SupplierRepository} from "../db/repositories/SupplierRepository";
import {SupplierService} from "../../core/services/SupplierService/SupplierService";
import {SupplierController} from "../controllers/Supplier/SupplierController";

const supplierController = new SupplierController(new SupplierService(new SupplierRepository()));

const router = Router();

router.get('/', AuthMiddleware, RoleMiddleware(['admin', 'employee']), (req: Request, res: Response) => {
    supplierController.getAllSuppliers(req, res);
});

router.get('/:id', AuthMiddleware, RoleMiddleware(['admin', 'employee']), (req: Request, res: Response) => {
    supplierController.getSupplierById(req, res)
})

router.post('/', AuthMiddleware, RoleMiddleware(['admin', 'employee']), (req: Request, res: Response) => {
    supplierController.createSupplier(req, res)
})

router.delete('/:id', AuthMiddleware, RoleMiddleware(['admin']), (req: Request, res: Response) => {
    supplierController.deleteSupplier(req, res)
})

export default router;