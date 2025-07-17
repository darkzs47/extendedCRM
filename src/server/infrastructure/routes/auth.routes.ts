import { Request, Response, Router } from 'express';
import {AuthController} from "../controllers/AuthController/AuthController";
import {AuthService} from "../../core/services/AuthService/AuthService";
import {AuthRepository} from "../db/repositories/AuthRepository";
import {registrationValidation} from "../validations/registerValidation";
import {AuthMiddleware} from "../middlewares/AuthMiddleware";
import {TokenService} from "../../core/services/TokenService/TokenService";
import {TokenRepository} from "../db/repositories/TokenRepository";
import {loginValidation} from "../validations/authValidation";

const tokenRepository = new TokenRepository();
const tokenService = new TokenService(tokenRepository);

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository, tokenService);

const authController = new AuthController(authService);

const router = Router();

router.post('/login', loginValidation, (req: Request, res: Response) => {
    authController.login(req, res);
});

router.post('/registration', registrationValidation, (req: Request, res: Response) => {
    authController.registration(req, res);
});

router.post('/logout', AuthMiddleware,(req: Request, res: Response) => {
    authController.logout(req, res);
})

router.get('/refresh', (req: Request, res: Response) => {
    authController.refresh(req, res);
})

export default router;