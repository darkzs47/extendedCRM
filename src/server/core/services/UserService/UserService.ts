import {IUserRepository} from "../../repositories/UserRepository/IUserRepository";
import {CreateUserDto} from "../../repositories/UserRepository/dto/CreateUserDto";
import {User} from "../../models/User/User";
import {UserModel} from "../../../infrastructure/db/models/User/UserModel";
import {UserMapper} from "../../../infrastructure/db/mappers/UserMapper/UserMapper";

export class UserService{
    constructor(readonly userRepository: IUserRepository) {}

    // async createUser(dto: CreateUserDto): Promise<User> {
    //     return this.userRepository.create(dto);
    // }

    async getAll(): Promise<User[]> {
        const usersDomains = await this.userRepository.getAll();
        return usersDomains;
    }
}
