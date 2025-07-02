import {ITokenRepository} from "../../repositories/TokenRepository/ITokenRepository";
import {TokenModel} from "../../../infrastructure/db/models/Token/TokenModel";
import jwt, {JwtPayload} from "jsonwebtoken";

export class TokenService {
    constructor(readonly tokenRepository: ITokenRepository) {}

    async saveToken(userId: number, refreshToken: string): Promise<TokenModel> {
        return await this.tokenRepository.saveToken(userId, refreshToken);
    }

    async removeToken(refreshToken: string): Promise<number> {
        return await this.tokenRepository.removeToken(refreshToken);
    }

    validateAccessToken(token: string): string | null | JwtPayload {
        try {
            const userData = jwt.verify(token, process.env.SECRET as string);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token: string): string | null | JwtPayload {
        try {
            const userData = jwt.verify(token, process.env.SECRET_REFRESH as string);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async findToken(refreshToken: string) {
        return await this.tokenRepository.findToken(refreshToken);
    }
}