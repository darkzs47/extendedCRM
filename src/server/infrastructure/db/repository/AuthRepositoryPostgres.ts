import {IAuthRepository} from "../../../core/repositories/IAuthRepository";
import {User} from "../../../core/models/User/User";
import {UserModel} from "../models/User/UserModel";
import {UserMapper} from "../mappers/UserMapper/UserMapper";

export class AuthRepositoryPostgres implements IAuthRepository{
    async findByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({ where: { email: email } });
        return user ? UserMapper.toDomain(user) : null;
    }
}
