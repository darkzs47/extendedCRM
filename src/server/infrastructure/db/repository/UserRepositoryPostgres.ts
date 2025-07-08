import {IUserRepository} from "../../../core/repositories/UserRepository/IUserRepository";
import {CreateUserDto} from "../../../core/repositories/UserRepository/dto/CreateUserDto";
import {User} from "../../../core/models/User/User";
import {UserModel} from "../models/User/UserModel";
import {UserMapper} from "../mappers/UserMapper/UserMapper";
import {UpdateUserDto} from "../../../core/repositories/UserRepository/dto/UpdateUserDto";
import {SupplierModel} from "../models/SupplierModel/SupplierModel";

export class UserRepositoryPostgres implements IUserRepository{

    async getAll(): Promise<UserModel[]> {
        const usersModels = await UserModel.findAll(
            {
                include: [
                    {
                        model: SupplierModel,
                        as: 'supplier'
                    }
                ],
            }
        );
        return usersModels;
    }

    async delete(id: number): Promise<UserModel | null> {
        const user = await UserModel.findByPk(id)
        user ? user.destroy() : null;
        return user ? user : null;
    }

    async update(dto: UpdateUserDto): Promise<UserModel | null> {
        const user = await UserModel.findByPk(dto.id)
        return user ? user.update(
            { email: dto.email, phone: dto.phone, role: dto.role, supplierId: dto.supplierId ?? null },
        ) : null;
    }
}