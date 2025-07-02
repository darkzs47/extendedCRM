import {IAuthRepository} from "../../repositories/Auth/IAuthRepository";
import bcrypt from "bcrypt";
import {generateAccessToken} from "../../../generateAccessToken";
import {RegisterDto} from "../../repositories/Auth/dto/RegisterDto";

export class AuthService {
    constructor(readonly userRepository: IAuthRepository) {}

    async login(email: string, password: string): Promise<string> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) throw new Error('Invalid email or password');

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) throw new Error('Invalid email or password');

        const token = generateAccessToken({ id: user.id, role: user.role });
        return token;
    }

    async registration(dto: RegisterDto): Promise<void> {
        const candidate = await this.userRepository.findByEmail(dto.email);

        if (candidate) throw new Error('User already registered');

        await this.userRepository.registration(dto);
    }

}