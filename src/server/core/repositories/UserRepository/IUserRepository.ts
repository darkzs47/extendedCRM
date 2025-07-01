import {User} from "../../models/User/User";
import {CreateUserDto} from "./dto/CreateUserDto";

export interface IUserRepository {
    create(dto: CreateUserDto): Promise<User>;
}
