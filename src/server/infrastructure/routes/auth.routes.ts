import { Request, Response, Router } from 'express';
import {AuthController} from "../controllers/AuthController";
import {AuthService} from "../../core/services/AuthService/AuthService";
import {AuthRepositoryPostgres} from "../db/repository/AuthRepositoryPostgres";
import {check} from "express-validator";
import {registrationValidation} from "../validations/registerValidation";

const authController = new AuthController(new AuthService(new AuthRepositoryPostgres));

const router = Router();

router.post('/login', (req: Request, res: Response) => {
    authController.login(req, res);
});

router.post('/registration', registrationValidation, (req: Request, res: Response) => {
    authController.registration(req, res);
});

export default router;