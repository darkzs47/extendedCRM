import {Request, Response, Router} from "express";
import {RoleMiddleware} from "../middlewares/RoleMiddleware";
import {AuthMiddleware} from "../middlewares/AuthMiddleware";
import {ToolController} from "../controllers/ToolController/ToolController";
import {ToolService} from "../../core/services/ToolService/ToolService";
import {ToolRepository} from "../db/repositories/ToolRepository";

const router = Router();

const toolController = new ToolController(new ToolService(new ToolRepository()))

router.get('/', AuthMiddleware, RoleMiddleware(['admin', "employee"]), (req: Request, res: Response) => {
    toolController.getAllTools(req, res)
})

router.post('/', AuthMiddleware, RoleMiddleware(['admin', 'employee']), (req: Request, res: Response) => {
    toolController.createTool(req, res)
})

router.patch('/:id', AuthMiddleware, RoleMiddleware(['admin', 'employee']), (req: Request, res: Response) => {
    toolController.updateTool(req, res)
})

router.delete('/:id', AuthMiddleware, RoleMiddleware(['admin', 'employee']), (req: Request, res: Response) => {
    toolController.deleteTool(req, res)
})

export default router;