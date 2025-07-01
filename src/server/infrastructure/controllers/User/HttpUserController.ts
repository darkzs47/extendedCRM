import {UserService} from "../../../core/services/UserService/UserService";
import {CreateUserDto} from "../../../core/repositories/UserRepository/dto/CreateUserDto";
import {constants} from "http2";
import { Request, Response } from 'express';
import hashPassword from "../../../hash";

export class HttpUserController {
    constructor(readonly userService: UserService) {}

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const {id, secondName, name, lastName, phone, email, role, password} = req.body;
            const hashedPassword = await hashPassword(password);
            await this.userService.createUser(new CreateUserDto(id, secondName, name, lastName, email, phone, hashedPassword, role));

            res.status(constants.HTTP_STATUS_CREATED).json("Пользователь создан");
        } catch (e: unknown) {
            const error = e as Error;
            res.status(constants.HTTP_STATUS_NOT_FOUND).json("Пользователь не создан " + error.message);
        }
    }
}