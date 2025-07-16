import {Request, Response, NextFunction} from "express";
import {constants} from "http2";
import jwt from "jsonwebtoken";
import {UserRole} from "../../core/models/User/User";

const secret = process.env.JWT_SECRET as string;

export const RoleMiddleware = (userRoles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (req.method === "OPTIONS") next()

        try {
            const token = req.headers.authorization;

            if (!token || !token.startsWith('Bearer ')) {
                res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({message: "Авторизуйтесь"});
                return
            }

            const payload = token.split(' ')[1];
            // @ts-ignore
            const {role} = jwt.verify(payload, secret);
            let hasRole: boolean = false;

            userRoles.forEach(role => {
                if (userRoles.includes(role)) {
                    hasRole = true;
                }
            })

            if (!hasRole) {
                res.status(constants.HTTP_STATUS_FORBIDDEN).json({message: "Доступ запрещён"});
            }
            next()
        } catch (e) {
            console.error(e);
            res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({message: "Авторизуйтесь"});
            return;
        }
    }
}