import {UpdateUserDto} from "./dto/UpdateUserDto";
import {UserModel} from "../../../infrastructure/db/models/User/UserModel";

export interface IUserRepository {
    getAll(): Promise<UserModel[]>;
    delete(id: number): Promise<UserModel | null>;
    update(dto: UpdateUserDto): Promise<UserModel | null>;
}
