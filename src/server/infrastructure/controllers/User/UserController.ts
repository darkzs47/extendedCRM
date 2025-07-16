import {UserService} from "../../../core/services/UserService/UserService";
import {constants} from "http2";
import { Request, Response } from 'express';
import {UpdateUserDto} from "../../../core/repositories/UserRepository/dto/UpdateUserDto";
import {validationResult} from "express-validator";
import {UserWithoutPassword} from "../../../types/UserTypes/User";

export class UserController {
    constructor(readonly userService: UserService) {}

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users: UserWithoutPassword[] = await this.userService.getAllUsers()
            res.status(constants.HTTP_STATUS_OK).json(users)
            return
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: "Не удалось получить информацию о пользователях"});
            return
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const {id} = req.params;
            await this.userService.deleteUser(Number(id))
            res.status(constants.HTTP_STATUS_OK).json({ message: "Пользователь успешно удалён" })
            return
        } catch (e) {
            res.status(constants.HTTP_STATUS_CONFLICT).json({message: "Пользователь не удалён"});
            return
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: "Некорректные данные", errors})
                return
            }
            const {id} = req.params;
            const {role, email, phone, supplierId} = req.body;
            await this.userService.update(new UpdateUserDto(Number(id), email, phone, role, supplierId))
            res.status(constants.HTTP_STATUS_OK).json({ message: "Данные успешно изменены" })
            return
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: "Не удалось изменить данные"});
            return
        }
    }
}