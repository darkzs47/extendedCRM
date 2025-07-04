import {UserService} from "../../../core/services/UserService/UserService";
import {CreateUserDto} from "../../../core/repositories/UserRepository/dto/CreateUserDto";
import {constants} from "http2";
import { Request, Response } from 'express';
import hashPassword from "../../../hash";
import {UserModel} from "../../db/models/User/UserModel";

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
}