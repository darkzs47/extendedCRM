import {AuthService} from "../../core/services/AuthService/AuthService";
import {constants} from "http2";
import { Request, Response, } from "express";

export class AuthController {
    constructor(private authService: AuthService) {}

    async login(req: Request, res: Response): Promise<void> {
        try {
            const {email, password} = req.body;
            const token = await this.authService.login(email, password);
            res.status(constants.HTTP_STATUS_OK).json({token});
        } catch (e) {
            res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({message: (e as Error).message});
        }
    }
}