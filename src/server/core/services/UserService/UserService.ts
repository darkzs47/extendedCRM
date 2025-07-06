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
        const deleteResult = await this.userRepository.delete(id);
        if (!deleteResult) throw new Error("User deleted failed");
        return;
    }

    async update(dto: UpdateUserDto): Promise<void> {
        const user = await this.userRepository.update(dto);
        if (!user) throw new Error("User updated failed");
        return;
    }
}
