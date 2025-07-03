import {AuthService} from "../../core/services/AuthService/AuthService";
import {constants} from "http2";
import { Request, Response, } from "express";
import hashPassword from "../../hash";
import {RegisterDto} from "../../core/repositories/Auth/dto/RegisterDto";
import { validationResult } from "express-validator";
import {logger} from "../../logger";

export class AuthController {
    constructor(private authService: AuthService) {}

    async login(req: Request, res: Response): Promise<void> {
        try {
            const {email, password} = req.body;
            const userData = await this.authService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true});
            res.status(constants.HTTP_STATUS_CREATED).json(userData);
        } catch (e) {
            res.status(constants.HTTP_STATUS_NOT_FOUND).json({message: (e as Error).message});
        }
    }

    async registration(req: Request, res: Response): Promise<void> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: "Ошибка регистрации", errors})
                return
            }
            const {id, secondName, name, lastName, phone, email, password, role, supplierId} = req.body;
            const hashedPassword = await hashPassword(password);
            const userData = await this.authService.registration(new RegisterDto(id, secondName, name, lastName, email, phone, hashedPassword, role, supplierId));
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true});
            res.status(constants.HTTP_STATUS_CREATED).json("Пользователь создан");
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: (e as Error).message});
        }
    }

    async logout(req: Request, res: Response): Promise<void> {
        try {
            const {refreshToken} = req.cookies;
            await this.authService.logout(refreshToken);
            res.clearCookie('refreshToken');
            res.status(constants.HTTP_STATUS_OK).json({ message: 'Logout successful' });
            return
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: (e as Error).message});
        }
    }

    async refresh(req: Request, res: Response): Promise<void> {
        try {
            const {refreshToken} = req.cookies;
            const userData = await this.authService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true});
            res.status(constants.HTTP_STATUS_CREATED).json(userData);
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: (e as Error).message});
        }
    }
}