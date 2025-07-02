import {User} from "../../models/User/User";
import {RegisterDto} from "./dto/RegisterDto";
import {UserModel} from "../../../infrastructure/db/models/User/UserModel";

export interface IAuthRepository {
    findByEmail(email: string): Promise<User | null>;
    registration(dto: RegisterDto) : Promise<User>;
    findById(id: number): Promise<UserModel | null>;
}
