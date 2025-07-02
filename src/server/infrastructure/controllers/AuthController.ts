import {AuthService} from "../../core/services/AuthService/AuthService";
import {constants} from "http2";
import { Request, Response, } from "express";
import hashPassword from "../../hash";
import {RegisterDto} from "../../core/repositories/Auth/dto/RegisterDto";
import { validationResult } from "express-validator";

export class AuthController {
    constructor(private authService: AuthService) {}

    async login(req: Request, res: Response): Promise<void> {
        try {
            const {email, password} = req.body;
            const token = await this.authService.login(email, password);
            res.status(constants.HTTP_STATUS_OK).json({token});
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
            await this.authService.registration(new RegisterDto(id, secondName, name, lastName, email, phone, hashedPassword, role, supplierId));

            res.status(constants.HTTP_STATUS_CREATED).json("Пользователь создан");
        } catch (e) {
            console.error(e);
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: (e as Error).message});
        }
    }
}