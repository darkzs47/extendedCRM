import {IUserRepository} from "../../repositories/UserRepository/IUserRepository";
import {UpdateUserDto} from "../../repositories/UserRepository/dto/UpdateUserDto";
import {UserModel} from "../../../infrastructure/db/models/UserModel/UserModel";

export class UserService{
    constructor(readonly userRepository: IUserRepository) {}

    async getAllUsers(): Promise<UserModel[]> {
        const users: UserModel[] = await this.userRepository.getAllUsers();
        return users;
    }

    async update(dto: UpdateUserDto): Promise<UserModel> {
        const user: UserModel | null = await this.userRepository.updateUser(dto);
        if (!user) throw new Error("Информация пользователя не обновлена");
        return user;
    }

    async deleteUser(id: number): Promise<UserModel> {
        const user: UserModel | null = await this.userRepository.deleteUser(id);
        if (!user) throw new Error("Не удалось удалить пользователя");
        return user;
    }
}
