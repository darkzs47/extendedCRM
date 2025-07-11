import {ITokenRepository} from "../../../core/repositories/TokenRepository/ITokenRepository";
import {TokenModel} from "../models/TokenModel/TokenModel";
import {logger} from "../../../logger";

export class TokenRepositoryPostgres implements ITokenRepository {
    async findTokenByUserId(userId: number): Promise<TokenModel | null> {
        return await TokenModel.findOne({ where: { userId: userId } });
    }

    async findToken(refreshToken: string): Promise<TokenModel | null> {
        return await TokenModel.findOne({ where: { refreshToken } });
    }

    async saveToken(userId: number, refreshToken: string): Promise<TokenModel> {
        const existing = await this.findTokenByUserId(userId);

        if (existing) {
            existing.refreshToken = refreshToken;
            return await existing.save();
        }

        return await TokenModel.create({ userId: userId, refreshToken });
    }

    async removeToken(refreshToken: string): Promise<void> {
        await TokenModel.destroy({ where: { refreshToken: refreshToken } });
        return;
    }
}
