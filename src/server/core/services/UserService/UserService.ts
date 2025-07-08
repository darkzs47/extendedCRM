import {IUserRepository} from "../../repositories/UserRepository/IUserRepository";
import {UpdateUserDto} from "../../repositories/UserRepository/dto/UpdateUserDto";
import {UserModel} from "../../../infrastructure/db/models/User/UserModel";

export class UserService{
    constructor(readonly userRepository: IUserRepository) {}

    async getAll(): Promise<UserModel[]> {
        const users = await this.userRepository.getAll();
        return users;
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
