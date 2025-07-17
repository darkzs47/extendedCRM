import {Request, Response, Router} from "express";
import {AuthMiddleware} from "../middlewares/AuthMiddleware";
import {RoleMiddleware} from "../middlewares/RoleMiddleware";
import {SeasonCoefficientsRepository} from "../db/repositories/SeasonCoefficientsRepository";
import {SeasonCoefficientsService} from "../../core/services/CoefficientsService/SeasonCoefficientsService";
import {SeasonCoefficientsController} from "../controllers/CoefficientsController/SeasonCoefficientsController";

const router = Router();

const seasonCoefficientsController = new SeasonCoefficientsController(new SeasonCoefficientsService((new SeasonCoefficientsRepository())));

router.get('/season', AuthMiddleware, RoleMiddleware(['admin', "employee"]), (req: Request, res: Response) => {
    seasonCoefficientsController.getAllSeasonCoefficients(req, res);
})

router.patch('/season/:id', AuthMiddleware, RoleMiddleware(['admin', 'employee']), (req: Request, res: Response) => {
    seasonCoefficientsController.updateSeasonCoefficient(req, res)
})

export default router;