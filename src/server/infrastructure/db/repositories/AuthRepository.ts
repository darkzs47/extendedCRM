import {IAuthRepository} from "../../../core/repositories/Auth/IAuthRepository";
import {User} from "../../../core/models/User/User";
import {UserModel} from "../models/UserModel/UserModel";
import {UserMapper} from "../mappers/UserMapper/UserMapper";
import {RegisterDto} from "../../../core/repositories/Auth/dto/RegisterDto";

export class AuthRepository implements IAuthRepository{
    async findUserByEmail(email: string): Promise<User | null> {
        const user: UserModel | null = await UserModel.findOne({ where: { email: email } });
        return user ? UserMapper.toDomain(user) : null;
    }

    async registration(dto: RegisterDto): Promise<User> {
        const user: UserModel | null = await UserModel.create(UserMapper.toModel(dto));
        return UserMapper.toDomain(user);
    }

    async findUserById(id: number): Promise<UserModel | null> {
        const user: UserModel | null = await UserModel.findByPk(id)
        return user ? user : null;
    }
}
