import {NextFunction} from "express";
import {constants} from "http2";
import jwt from "jsonwebtoken";
import {Response, Request} from "express";

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers["x-access-token"] || req.headers["authorization"];

    if (!token) {
        res.status(constants.HTTP_STATUS_FORBIDDEN).json({ message: "No token provided!" });
        return;
    }

    const tokenStr = Array.isArray(token) ? token[0] : token;
    const actualToken = tokenStr?.startsWith("Bearer ") ? tokenStr.slice(7) : tokenStr;

    jwt.verify(actualToken, process.env.JWT_SECRET as string, (err, decoded) => {
        if (err) {
                return res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({ message: "Unauthorized!" });
        }
        const payload = decoded as jwt.JwtPayload;
        (req as any).id = payload.id;
        next();
    });
};