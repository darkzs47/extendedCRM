import {IUserRepository} from "../../../core/repositories/UserRepository/IUserRepository";
import {CreateUserDto} from "../../../core/repositories/UserRepository/dto/createUserDto";
import {User} from "../../../core/models/User/User";

export class UserRepositoryPostgres implements IUserRepository{
    add(dto: CreateUserDto): Promise<User> {
        // @ts-ignore
        return Promise<User>;
    }

}