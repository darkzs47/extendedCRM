import {User} from "../../models/User/User";
import {CreateUserDto} from "./dto/createUserDto";

export interface IUserRepository {
    add(dto: CreateUserDto): Promise<User>;
}
