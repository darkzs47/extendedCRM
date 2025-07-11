import {Request, Response, Router} from 'express';
import {UserController} from "../controllers/User/UserController";
import {UserService} from "../../core/services/UserService/UserService";
import {UserRepositoryPostgres} from "../db/repository/UserRepositoryPostgres";
import {AuthMiddleware} from "../middlewares/AuthMiddleware";
import {RoleMiddleware} from "../middlewares/RoleMiddleware";
import {updateUserValidation} from "../validations/updateUserValidation";

const postgresUserController = new UserController(new UserService(new UserRepositoryPostgres()));

const router = Router();

router.get('/', AuthMiddleware, RoleMiddleware(["admin"]),(req: Request, res: Response) => {
    postgresUserController.getAll(req, res);
});

router.delete('/:id', AuthMiddleware, RoleMiddleware(["admin"]),(req: Request, res: Response) => {
    postgresUserController.delete(req, res);
})

router.patch(
    '/:id',
    AuthMiddleware,
    RoleMiddleware(["admin"]),
    updateUserValidation,
    (req: Request, res: Response) => {
        postgresUserController.update(req, res);
    }
)

export default router;