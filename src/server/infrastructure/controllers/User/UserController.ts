import {UserService} from "../../../core/services/UserService/UserService";
import {constants} from "http2";
import { Request, Response } from 'express';
import {UpdateUserDto} from "../../../core/repositories/UserRepository/dto/UpdateUserDto";
import {validationResult} from "express-validator";
import {UserModel} from "../../db/models/User/UserModel";

type UserWithoutPassword = Pick<UserModel, 'id' | 'secondName' | 'name' | 'lastName' | 'phone' | 'email' | 'role' | 'supplierId' | 'supplier'>

export class UserController {
    constructor(readonly userService: UserService) {}

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const users: UserWithoutPassword[] = (await this.userService.getAll())
                .map(({ id, secondName, name, lastName, phone, email, role, supplierId, supplier }) =>
                    ({ id, secondName, name, lastName, phone, email, role, supplierId, supplier }));
            res.status(constants.HTTP_STATUS_OK).json(users)
            return
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: (e as Error).message});
            return
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const {id} = req.params;
            await this.userService.delete(Number(id))
            res.status(constants.HTTP_STATUS_OK).json({ message: "Пользователь успешно удалён" })
            return
        } catch (e) {
            res.status(constants.HTTP_STATUS_CONFLICT).json({message: (e as Error).message});
        }
    }

    async update(req: Request, res: Response): Promise<void> {
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
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: (e as Error).message});
        }
    }
}