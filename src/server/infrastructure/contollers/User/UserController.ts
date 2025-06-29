import {UserService} from "../../../core/services/UserService/UserService";
import {AddUserDto} from "../../../core/repositories/UserRepository/dto/addUserDto";

export class UserController {
    constructor(readonly userService: UserService) {}

    async createUser(req: Request, res: Response) {
        try {
            const {id, secondName, name, lastName, phone, email, role, password} = req.body;
            await this.userService.add(new AddUserDto(id , secondName, name, lastName, phone, email, role, password));

            // @ts-ignore
            await res.json("Пользователь создан");
        } catch (e) {
            res.status(400).json("Пользователь не создан " + e.message);
        }

    }
}