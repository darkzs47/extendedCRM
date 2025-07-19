import {IUserRepository} from "../../../core/repositories/UserRepository/IUserRepository";
import {UserModel} from "../models/UserModel/UserModel";
import {UpdateUserDto} from "../../../core/repositories/UserRepository/dto/UpdateUserDto";
import {SupplierModel} from "../models/SupplierModel/SupplierModel";
import {logger} from "../../../logger";

export class UserRepository implements IUserRepository{

    async getAllUsers(): Promise<UserModel[]> {
        const users: UserModel[] = await UserModel.findAll(
            {
                include: [
                    {
                        model: SupplierModel,
                        as: 'supplier'
                    }
                ],
            }
        );
        return users;
    }

    async deleteUser(id: number): Promise<UserModel | null> {
        const user: UserModel | null = await UserModel.findByPk(id)
        user ? await user.destroy() : null;
        return user
    }

    async updateUser(dto: UpdateUserDto): Promise<UserModel | null> {
        const user: UserModel | null = await UserModel.findByPk(dto.id)
        user ? user.update(
            { email: dto.email, phone: dto.phone, role: dto.role, supplierId: dto.supplierId },
        ) : null;
        return user;
    }
}