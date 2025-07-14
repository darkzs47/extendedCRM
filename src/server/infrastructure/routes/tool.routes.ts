import {Request, Response, Router} from "express";
import {RoleMiddleware} from "../middlewares/RoleMiddleware";
import {AuthMiddleware} from "../middlewares/AuthMiddleware";
import {ToolController} from "../controllers/Tool/ToolController";
import {ToolService} from "../../core/services/ToolService/ToolService";
import {ToolRepositoryPostgres} from "../db/repository/ToolRepositoryPostgres";

const router = Router();

const postgresToolController = new ToolController(new ToolService(new ToolRepositoryPostgres()))

router.get('/', AuthMiddleware, RoleMiddleware(['admin', "employee"]), (req: Request, res: Response) => {
    postgresToolController.getAllTools(req, res)
})

router.post('/', AuthMiddleware, RoleMiddleware(['admin', 'employee']), (req: Request, res: Response) => {
    postgresToolController.createTool(req, res)
})

router.patch('/:id', AuthMiddleware, RoleMiddleware(['admin', 'employee']), (req: Request, res: Response) => {
    postgresToolController.updateTool(req, res)
})

router.delete('/:id', AuthMiddleware, RoleMiddleware(['admin', 'employee']), (req: Request, res: Response) => {
    postgresToolController.deleteTool(req, res)
})

export default router;