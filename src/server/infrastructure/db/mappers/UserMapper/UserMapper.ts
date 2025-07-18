import { UserModel } from "../../models/UserModel/UserModel";
import { User } from "../../../../core/models/User/User";
import {CreateUserDto} from "../../../../core/repositories/UserRepository/dto/CreateUserDto";
import {RegisterDto} from "../../../../core/repositories/Auth/dto/RegisterDto";

export class UserMapper {
    static toDomain(model: UserModel): User {
        return new User(
            model.id,
            model.secondName,
            model.name,
            model.lastName,
            model.email,
            model.phone,
            model.password,
            model.role,
            model.supplierId,
        );
    }

    static toModel(dto: CreateUserDto | RegisterDto): Partial<UserModel> {
        return {
            secondName: dto.secondName,
            name: dto.name,
            lastName: dto.lastName,
            email: dto.email,
            phone: dto.phone,
            password: dto.password,
            role: dto.role,
            supplierId: dto.supplierId,
        };
    }
}