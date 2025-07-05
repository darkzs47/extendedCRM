import {User} from "../../models/User/User";
import {CreateUserDto} from "./dto/CreateUserDto";
import {UpdateUserDto} from "./dto/UpdateUserDto";

export interface IUserRepository {
    // create(dto: CreateUserDto): Promise<User>;
    getAll(): Promise<User[]>;
    delete(id: number): Promise<void>;
    update(dto: UpdateUserDto): Promise<void>;
}
