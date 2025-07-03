import {Request, Response, NextFunction} from "express";
import {constants} from "http2";
import jwt from "jsonwebtoken";
import {logger} from "../../logger";
const secret = process.env.JWT_SECRET as string;

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    if (req.method === "OPTIONS") next()

    try {
        const token = req.headers.authorization;

        if (!token || !token.startsWith('Bearer ')) {
            res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({message: "Unauthorized"});
            return
        }

        const payload = token.split(' ')[1];
        const decodedData = jwt.verify(payload, secret);

        req.user = decodedData;
        next()
    } catch (e) {
        res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({message: "Unauthorized"});
        return;
    }
}