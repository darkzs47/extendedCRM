import {IUserRepository} from "../../../core/repositories/UserRepository/IUserRepository";
import {CreateUserDto} from "../../../core/repositories/UserRepository/dto/CreateUserDto";
import {User} from "../../../core/models/User/User";
import {UserModel} from "../models/User/UserModel";
import {UserMapper} from "../mappers/UserMapper/UserMapper";
import {UpdateUserDto} from "../../../core/repositories/UserRepository/dto/UpdateUserDto";

export class UserRepositoryPostgres implements IUserRepository{
    // async create(dto: CreateUserDto): Promise<User> {
    //     const user = await UserModel.create(UserMapper.toModel(dto));
    //     return UserMapper.toDomain(user);
    // }

    async getAll(): Promise<User[]> {
        const usersModels = await UserModel.findAll();
        const usersDomains = UserMapper.toDomains(usersModels)
        return usersDomains;
    }

    async delete(id: number): Promise<void> {
        const user = await UserModel.findByPk(id)
        user ? user.destroy() : null;
        return;
    }

    async update(dto: UpdateUserDto): Promise<void> {
        const user = await UserModel.findByPk(dto.id)
        user ? user.update(
            { email: dto.email, phone: dto.phone, role: dto.role, supplierId: dto.supplierId ?? null },
        ) : null;
        return;
    }
}