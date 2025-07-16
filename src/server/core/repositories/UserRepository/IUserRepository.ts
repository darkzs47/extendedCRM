import {UpdateUserDto} from "./dto/UpdateUserDto";
import {UserModel} from "../../../infrastructure/db/models/UserModel/UserModel";

export interface IUserRepository {
    getAllUsers(): Promise<UserModel[]>;
    updateUser(dto: UpdateUserDto): Promise<UserModel | null>;
    deleteUser(id: number): Promise<UserModel | null>;
}
