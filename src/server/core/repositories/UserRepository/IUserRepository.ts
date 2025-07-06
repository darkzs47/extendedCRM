import {User} from "../../models/User/User";
import {CreateUserDto} from "./dto/CreateUserDto";
import {UpdateUserDto} from "./dto/UpdateUserDto";
import {UserModel} from "../../../infrastructure/db/models/User/UserModel";

export interface IUserRepository {
    // create(dto: CreateUserDto): Promise<User>;
    getAll(): Promise<User[]>;
    delete(id: number): Promise<void | null>;
    update(dto: UpdateUserDto): Promise<UserModel | null>;
}
