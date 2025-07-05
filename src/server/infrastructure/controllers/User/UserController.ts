import {UserService} from "../../../core/services/UserService/UserService";
import {CreateUserDto} from "../../../core/repositories/UserRepository/dto/CreateUserDto";
import {constants} from "http2";
import { Request, Response } from 'express';
import hashPassword from "../../../hash";
import {UserModel} from "../../db/models/User/UserModel";
import {UpdateUserDto} from "../../../core/repositories/UserRepository/dto/UpdateUserDto";

export class UserController {
    constructor(readonly userService: UserService) {}

    // async createUser(req: Request, res: Response): Promise<void> {
    //     try {
    //         const {id, secondName, name, lastName, phone, email, role, password} = req.body;
    //         const hashedPassword = await hashPassword(password);
    //         await this.userService.createUser(new CreateUserDto(id, secondName, name, lastName, email, phone, hashedPassword, role));
    //
    //         res.status(constants.HTTP_STATUS_CREATED).json("Пользователь создан");
    //     } catch (e) {
    //         const error = e as Error;
    //         res.status(constants.HTTP_STATUS_NOT_FOUND).json("Пользователь не создан " + error.message);
    //     }
    // }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userService.getAll();
            res.status(constants.HTTP_STATUS_OK).json(users)
            return
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: (e as Error).message});
            return
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const {id} = req.body;
            await this.userService.delete(id)
            res.status(constants.HTTP_STATUS_OK).json({ message: "Пользователь успешно удалён" })
            return
        } catch (e) {
            res.status(constants.HTTP_STATUS_CONFLICT).json({message: (e as Error).message});
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const {id, role, email, phone} = req.body;
            await this.userService.update(new UpdateUserDto(id, email, phone, role))
            res.status(constants.HTTP_STATUS_OK).json({ message: "Данные успешно изменены" })
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: (e as Error).message});
        }
    }
}