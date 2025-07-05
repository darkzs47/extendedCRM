import {IUserRepository} from "../../repositories/UserRepository/IUserRepository";
import {User} from "../../models/User/User";
import {UpdateUserDto} from "../../repositories/UserRepository/dto/UpdateUserDto";

export class UserService{
    constructor(readonly userRepository: IUserRepository) {}

    // async createUser(dto: CreateUserDto): Promise<User> {
    //     return this.userRepository.create(dto);
    // }

    async getAll(): Promise<User[]> {
        const usersDomains = await this.userRepository.getAll();
        return usersDomains;
    }

    async delete(id: number): Promise<void> {
        await this.userRepository.delete(id);
        return;
    }

    async update(dto: UpdateUserDto): Promise<void> {
        await this.userRepository.update(dto);
        return;
    }
}
