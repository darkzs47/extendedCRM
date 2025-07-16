import {Request, Response, Router} from "express";
import {AuthMiddleware} from "../middlewares/AuthMiddleware";
import {RoleMiddleware} from "../middlewares/RoleMiddleware";
import {SeasonCoefficientsRepository} from "../db/repositories/SeasonCoefficientsRepository";
import {SeasonCoefficientsService} from "../../core/services/CoefficientsService/SeasonCoefficientsService";
import {SeasonCoefficientsController} from "../controllers/Coefficients/SeasonCoefficientsController";
import {DistanceCoefficientsRepository} from "../db/repositories/DistanceCoefficientsRepository";
import {DistanceCoefficientsService} from "../../core/services/CoefficientsService/DistanceCoefficientsService";
import {DistanceCoefficientsController} from "../controllers/Coefficients/DistanceCoefficientsController";

const router = Router();

const seasonCoefficientsController = new SeasonCoefficientsController(new SeasonCoefficientsService((new SeasonCoefficientsRepository())));
const distanceCoefficientsController = new DistanceCoefficientsController(new DistanceCoefficientsService((new DistanceCoefficientsRepository())));

router.get('/season', AuthMiddleware, RoleMiddleware(['admin', "employee"]), (req: Request, res: Response) => {
    seasonCoefficientsController.getAllSeasonCoefficients(req, res);
})

router.get('/distance', AuthMiddleware, RoleMiddleware(['admin', "employee"]), (req: Request, res: Response) => {
    distanceCoefficientsController.getAllDistanceCoefficients(req, res);
})

router.post('/distance', AuthMiddleware, RoleMiddleware(['admin', "employee"]), (req: Request, res: Response) => {
    distanceCoefficientsController.createDistanceCoefficient(req, res);
})

router.patch('/season/:id', AuthMiddleware, RoleMiddleware(['admin', 'employee']), (req: Request, res: Response) => {
    seasonCoefficientsController.updateSeasonCoefficient(req, res)
})

router.patch('/distance/:id', AuthMiddleware, RoleMiddleware(['admin', 'employee']), (req: Request, res: Response) => {
    distanceCoefficientsController.updateDistanceCoefficient(req, res)
})

router.delete('/distance/:id', AuthMiddleware, RoleMiddleware(['admin', 'employee']), (req: Request, res: Response) => {
    distanceCoefficientsController.deleteDistanceCoefficient(req, res);
})

export default router;