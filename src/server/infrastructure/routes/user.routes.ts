import {Request, Response, NextFunction, Router} from 'express';
import {HttpUserController} from "../controllers/User/HttpUserController";
import {UserService} from "../../core/services/UserService/UserService";
import {UserRepositoryPostgres} from "../db/repository/UserRepositoryPostgres";

const postgresUserController = new HttpUserController(new UserService(new UserRepositoryPostgres()));

const router = Router();

router.post('/create', (req: Request, res: Response) => {
    postgresUserController.createUser(req, res);
});

export default router;