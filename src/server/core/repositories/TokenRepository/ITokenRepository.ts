import {Token} from "../../models/Token/Token";
import {TokenModel} from "../../../infrastructure/db/models/Token/TokenModel";

export interface ITokenRepository {
    saveToken(userId: number, token: string): Promise<TokenModel>;
    findTokenByUserId(userId: number): Promise<Token | null>;
    findToken(refreshToken: string): Promise<Token | null>;
    removeToken(refreshToken: string): Promise<void>;
}