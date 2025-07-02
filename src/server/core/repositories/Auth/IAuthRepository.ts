import {User} from "../../models/User/User";
import {RegisterDto} from "./dto/RegisterDto";

export interface IAuthRepository {
    findByEmail(email: string): Promise<User | null>;
    registration(dto: RegisterDto) : Promise<User>;
}
