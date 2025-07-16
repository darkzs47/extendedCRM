import {Request, Response, Router} from 'express';
import {UserController} from "../controllers/User/UserController";
import {UserService} from "../../core/services/UserService/UserService";
import {UserRepository} from "../db/repository/UserRepository";
import {AuthMiddleware} from "../middlewares/AuthMiddleware";
import {RoleMiddleware} from "../middlewares/RoleMiddleware";
import {updateUserValidation} from "../validations/updateUserValidation";

const postgresUserController = new UserController(new UserService(new UserRepository()));

const router = Router();

router.get('/', AuthMiddleware, RoleMiddleware(["admin"]),(req: Request, res: Response) => {
    postgresUserController.getAllUsers(req, res);
});

router.delete('/:id', AuthMiddleware, RoleMiddleware(["admin"]),(req: Request, res: Response) => {
    postgresUserController.deleteUser(req, res);
})

router.patch('/:id', AuthMiddleware, RoleMiddleware(["admin"]), updateUserValidation, (req: Request, res: Response) => {
    postgresUserController.updateUser(req, res);
})

export default router;