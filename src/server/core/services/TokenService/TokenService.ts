import {ITokenRepository} from "../../repositories/TokenRepository/ITokenRepository";
import {TokenModel} from "../../../infrastructure/db/models/TokenModel/TokenModel";
import jwt, {JwtPayload} from "jsonwebtoken";
import {Token} from "../../models/Token/Token";

export class TokenService {
    constructor(readonly tokenRepository: ITokenRepository) {}

    async saveToken(userId: number, refreshToken: string): Promise<TokenModel> {
        return await this.tokenRepository.saveToken(userId, refreshToken);
    }

    async removeToken(refreshToken: string): Promise<void> {
        await this.tokenRepository.removeToken(refreshToken);
        return
    }

    validateAccessToken(token: string): string | null | JwtPayload {
        try {
            const userData: string | JwtPayload = jwt.verify(token, process.env.SECRET as string);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token: string): string | null | JwtPayload {
        try {
            const userData: string | JwtPayload = jwt.verify(token, process.env.JWT_SECRET_REFRESH as string);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async findToken(refreshToken: string) {
        const token: Token | null = await this.tokenRepository.findToken(refreshToken);

        if (!token) throw new Error("Токен не найден");

        return token;
    }
}