import type {AxiosResponse} from "axios";
import api from "../http";
import type {CoefficientsSeasonResponse} from "../models/response/CoefficientsSeasonResponse.ts";
import type {UpdateSeasonCoefficientsRequest} from "../models/request/UpdateSeasonCoefficientsRequest.ts";

export class CoefficientsService {
    static async getSeasonCoefficients(): Promise<AxiosResponse<CoefficientsSeasonResponse>> {
        return api.get('/coefficients/season');
    }

    static async updateSeasonCoefficients(request: UpdateSeasonCoefficientsRequest): Promise<AxiosResponse> {
        return api.patch(`/coefficients/season/${request.id}`, request)
    }
}