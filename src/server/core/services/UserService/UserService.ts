import {IUserRepository} from "../../repositories/UserRepository/IUserRepository";
import {CreateUserDto} from "../../repositories/UserRepository/dto/createUserDto";
import {User} from "../../models/User/User";

export class UserService{
    constructor(readonly userRepository: IUserRepository) {}

    async createUser(dto: CreateUserDto): Promise<User> {
        return this.userRepository.add(dto);
    }
}
