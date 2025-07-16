import {Request, Response, Router} from "express";
import {RoleMiddleware} from "../middlewares/RoleMiddleware";
import {AuthMiddleware} from "../middlewares/AuthMiddleware";
import {CategoryController} from "../controllers/Category/CategoryController";
import {CategoryService} from "../../core/services/CategoryService/CategoryService";
import {CategoryRepository} from "../db/repository/CategoryRepository";

const router = Router();

const categoryController = new CategoryController(new CategoryService(new CategoryRepository()));

router.get('/', AuthMiddleware, RoleMiddleware(['admin', "employee"]), (req: Request, res: Response) => {
    categoryController.getAllCategories(req, res);
})

router.post('/', AuthMiddleware, RoleMiddleware(['admin', 'employee']), (req: Request, res: Response) => {
    categoryController.createCategory(req, res)
})

router.patch('/:id', AuthMiddleware, RoleMiddleware(['admin', 'employee']), (req: Request, res: Response) => {
    categoryController.updateCategory(req, res)
})

router.delete(':id', AuthMiddleware, RoleMiddleware(['admin', 'employee']), (req: Request, res: Response) => {
    categoryController.deleteCategory(req, res)
})

export default router;