import {User} from "../../models/User/User";
import {CreateUserDto} from "./dto/createUserDto";

export interface UserRepository{
    add(dto: CreateUserDto): Promise<User>;
}
