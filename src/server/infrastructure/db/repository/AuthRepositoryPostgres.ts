import {IAuthRepository} from "../../../core/repositories/Auth/IAuthRepository";
import {User} from "../../../core/models/User/User";
import {UserModel} from "../models/User/UserModel";
import {UserMapper} from "../mappers/UserMapper/UserMapper";
import {RegisterDto} from "../../../core/repositories/Auth/dto/RegisterDto";

export class AuthRepositoryPostgres implements IAuthRepository{
    async findByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({ where: { email: email } });
        return user ? UserMapper.toDomain(user) : null;
    }

    async registration(dto: RegisterDto): Promise<User> {
        const user = await UserModel.create(UserMapper.toModel(dto));
        return UserMapper.toDomain(user);
    }
}
