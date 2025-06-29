import {UserRepository} from "../../repositories/UserRepository/UserRepository";
import {AddUserDto} from "../../repositories/UserRepository/dto/addUserDto";
import {User} from "../../models/User/User";

export class UserService{
    constructor(readonly userRepository: UserRepository) {}

    async add(dto: AddUserDto) {
        const newUser = this.userRepository.add({
                id: 1,
                secondName: "Иванов",
                name: "Иван",
                lastName: "Иванович",
                email: "user1@user.com",
                phone: "+79995252520",
                password: "user1",
                role: "user",
            }
        );
    }
}
