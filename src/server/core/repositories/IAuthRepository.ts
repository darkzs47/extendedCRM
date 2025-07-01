import {User} from "../models/User/User";

export interface IAuthRepository {
    findByEmail(email: string): Promise<User | null>;
}
