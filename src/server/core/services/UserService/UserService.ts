import {UserRepository} from "../../repositories/UserRepository/UserRepository";
import {CreateUserDto} from "../../repositories/UserRepository/dto/createUserDto";
import {User} from "../../models/User/User";

export class UserService{
    constructor(readonly userRepository: UserRepository) {}

    async createUser(dto: CreateUserDto): Promise<User> {
        return this.userRepository.add(dto);
    }
}
