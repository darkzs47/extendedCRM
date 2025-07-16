import {IAuthRepository} from "../../repositories/Auth/IAuthRepository";
import bcrypt from "bcrypt";
import {generateTokens} from "../../../generateTokens";
import {RegisterDto} from "../../repositories/Auth/dto/RegisterDto";
import {TokenService} from "../TokenService/TokenService";
import {UserAuth} from "../../../types/UserTypes/UserAuth";
import {User} from "../../models/User/User";
import {Jwt, JwtPayload} from "jsonwebtoken";
import {Token} from "../../models/Token/Token";
import {UserModel} from "../../../infrastructure/db/models/UserModel/UserModel";
import {Tokens} from "../../../types/TokenTypes/Tokens";

export class AuthService {
    constructor(
        readonly userRepository: IAuthRepository,
        private readonly tokenService: TokenService) {}

    async login(email: string, password: string): Promise<UserAuth> {
        const user: User | null = await this.userRepository.findUserByEmail(email);

        if (!user) throw new Error('Пользователя с таким email не существует');

        const isPasswordValid: boolean = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) throw new Error('Неверный пароль');

        const tokens: Tokens = generateTokens({ id: user.id, role: user.role });
        await this.tokenService.saveToken(user.id, tokens.refreshToken);

        return {
            ...tokens,
            id: user.id,
            role: user.role
        }
    }

    async registration(dto: RegisterDto): Promise<UserAuth> {
        const candidate: User | null = await this.userRepository.findUserByEmail(dto.email);

        if (candidate) throw new Error('Пользователь с таким email уже существует');

        const user: User = await this.userRepository.registration(dto);

        const tokens: Tokens = generateTokens({ id: user.id, role: user.role });
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

    async refresh(refreshToken: string): Promise<UserAuth> {
        if (!refreshToken) throw new Error('Refresh токен обязателен');

        const userData: string | JwtPayload | null = this.tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb: Token = await this.tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) throw new Error('Авторизуйтесь!');
        // @ts-ignore
        const user: UserModel | null = await this.userRepository.findUserById(Number(userData.id));
        if (!user) throw new Error('Авторизуйтесь!');
        const tokens = generateTokens({ id: user.id, role: user.role });
        await this.tokenService.saveToken(user.id, tokens.refreshToken);
        return {
            ...tokens,
            id: user.id,
            role: user.role
        }
    }
}