import {Request, Response, Router} from 'express';
import {UserController} from "../controllers/User/UserController";
import {UserService} from "../../core/services/UserService/UserService";
import {UserRepositoryPostgres} from "../db/repository/UserRepositoryPostgres";
import {AuthMiddleware} from "../middlewares/AuthMiddleware";
import {RoleMiddleware} from "../middlewares/RoleMiddleware";

const postgresUserController = new UserController(new UserService(new UserRepositoryPostgres()));

const router = Router();

// router.post('/create', (req: Request, res: Response) => {
//     postgresUserController.createUser(req, res);
// });

router.get('/', AuthMiddleware, RoleMiddleware(["admin", "user"]),(req: Request, res: Response) => {
    postgresUserController.getAll(req, res);
});

router.delete('/delete', AuthMiddleware, RoleMiddleware(["admin"]),(req: Request, res: Response) => {
    postgresUserController.delete(req, res);
})

export default router;