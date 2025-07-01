import {IAuthRepository} from "../../repositories/IAuthRepository";
import {User} from "../../models/User/User";
import bcrypt from "bcrypt";
import {generateToken} from "../../../generateToken";

export class AuthService {
    constructor(readonly userRepository: IAuthRepository) {}


    async login(email: string, password: string): Promise<string> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) throw new Error('Пользователь не найден')

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) throw new Error('Неверный пароль');

        const token = generateToken({ id: user.id, role: user.role });
        return token;
    }

}