import type {AxiosResponse} from "axios";
import api from "../http";
import type {CoefficientsSeasonResponse} from "../models/response/CoefficientsSeasonResponse.ts";
import type {CoefficientsDistanceResponse} from "../models/response/CoefficientsDistanseResponse.ts";
import type {CoefficientsDistanceRequest} from "../models/request/CoefficientsDistanceRequest.ts";
import type {DeleteRequest} from "../models/request/DeleteRequest.ts";
import type {UpdateSeasonCoefficientsRequest} from "../models/request/UpdateSeasonCoefficientsRequest.ts";
import type {UpdateDistanceCoefficientsRequest} from "../models/request/UpdateDistanceCoefficientsRequest.ts";

export class CoefficientsService {
    static async getSeasonCoefficients(): Promise<AxiosResponse<CoefficientsSeasonResponse>> {
        return api.get('/coefficients/season');
    }

    static async getDistanceCoefficients(): Promise<AxiosResponse<CoefficientsDistanceResponse>> {
        return api.get('/coefficients/distance');
    }

    static async createDistanceCoefficients(request: CoefficientsDistanceRequest): Promise<AxiosResponse<CoefficientsDistanceResponse>> {
        return api.post('/coefficients/distance', request);
    }

    static async deleteDistanceCoefficients(request: DeleteRequest): Promise<AxiosResponse> {
        return api.delete(`/coefficients/distance/${request.id}`);
    }

    static async updateDistanceCoefficients(request: UpdateDistanceCoefficientsRequest): Promise<AxiosResponse> {
        return api.patch(`/coefficients/distance/${request.id}`, request)
    }

    static async updateSeasonCoefficients(request: UpdateSeasonCoefficientsRequest): Promise<AxiosResponse> {
        return api.patch(`/coefficients/distance/${request.id}`, request)
    }
}