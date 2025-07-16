import {User} from "../../core/models/User/User";

export type UserWithoutPassword = Omit<User, 'password'>
