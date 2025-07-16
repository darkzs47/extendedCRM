import {User} from "../../models/User/User";
import {RegisterDto} from "./dto/RegisterDto";
import {UserModel} from "../../../infrastructure/db/models/UserModel/UserModel";

export interface IAuthRepository {
    findUserByEmail(email: string): Promise<User | null>;
    registration(dto: RegisterDto) : Promise<User>;
    findUserById(id: number): Promise<UserModel | null>;
}
