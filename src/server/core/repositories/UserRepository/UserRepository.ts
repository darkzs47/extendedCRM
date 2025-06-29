import {User} from "../../models/User/User";
import {AddUserDto} from "./dto/addUserDto";

export interface UserRepository{
    add(dto: AddUserDto): User;
    
}
