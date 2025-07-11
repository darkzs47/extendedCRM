import {IAuthRepository} from "../../repositories/Auth/IAuthRepository";
import bcrypt from "bcrypt";
import {generateTokens, Tokens} from "../../../generateTokens";
import {RegisterDto} from "../../repositories/Auth/dto/RegisterDto";
import {TokenService} from "../TokenService/TokenService";
import {User, UserRole} from "../../models/User/User";

type UserData = {
    accessToken: string;
    refreshToken: string;
    id: number;
    role: UserRole;
}

export class AuthService {
    constructor(
        readonly userRepository: IAuthRepository,
        private readonly tokenService: TokenService) {}

    async login(email: string, password: string): Promise<UserData> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) throw new Error('Invalid email or password');

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) throw new Error('Invalid email or password');

        const tokens = generateTokens({ id: user.id, role: user.role });
        await this.tokenService.saveToken(user.id, tokens.refreshToken);

        return {
            ...tokens,
            id: user.id,
            role: user.role
        }
    }

    async registration(dto: RegisterDto): Promise<UserData> {
        const candidate = await this.userRepository.findByEmail(dto.email);

        if (candidate) throw new Error('UserModel already registered');

        const user = await this.userRepository.registration(dto);

        const tokens = generateTokens({ id: user.id, role: user.role });
        await this.tokenService.saveToken(user.id, tokens.refreshToken);

        return {
            ...tokens,
            id: user.id,
            role: user.role
        }
    }

    async logout(refreshToken: string): Promise<void> {
        await this.tokenService.removeToken(refreshToken);
        return;
    }

    async refresh(refreshToken: string): Promise<UserData> {
        if (!refreshToken) throw new Error('Refresh token is required');

        const userData = this.tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await this.tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) throw new Error('Unauthorized');
        // @ts-ignore
        const user = await this.userRepository.findById(userData.id);
        if (!user) throw new Error('Unauthorized');
        const tokens = generateTokens({ id: user.id, role: user.role });
        await this.tokenService.saveToken(user.id, tokens.refreshToken);
        return {
            ...tokens,
            id: user.id,
            role: user.role
        }
    }
}