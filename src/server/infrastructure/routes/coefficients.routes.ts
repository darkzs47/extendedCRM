import {Request, Response, Router} from "express";
import {AuthMiddleware} from "../middlewares/AuthMiddleware";
import {RoleMiddleware} from "../middlewares/RoleMiddleware";
import {SeasonCoefficientsRepository} from "../db/repository/SeasonCoefficientsRepository";
import {SeasonCoefficientService} from "../../core/services/CoefficientsService/SeasonCoefficientService";
import {SeasonCoefficientController} from "../controllers/Coefficients/SeasonCoefficientController";

const router = Router();

const seasonCoefficientsController = new SeasonCoefficientController(new SeasonCoefficientService((new SeasonCoefficientsRepository())));

router.get('/season', AuthMiddleware, RoleMiddleware(['admin', "employee"]), (req: Request, res: Response) => {
    seasonCoefficientsController.getAllSeasonCoefficients(req, res);
})

router.patch('/season/:id', AuthMiddleware, RoleMiddleware(['admin', 'employee']), (req: Request, res: Response) => {
    seasonCoefficientsController.updateSeasonCoefficient(req, res)
})

export default router;