import {SeasonCoefficientsService} from "../../../core/services/CoefficientsService/SeasonCoefficientsService";
import {constants} from "http2";
import {SeasonCoefficientsModel} from "../../db/models/CoefficientModels/SeasonCoefficientsModel";
import {
    UpdateSeasonCoefficientDto
} from "../../../core/repositories/CoefficientsRepository/dto/UpdateSeasonCoefficient";
import {Request, Response} from "express";

export class SeasonCoefficientsController {
    constructor(
        private readonly seasonCoefficientsService: SeasonCoefficientsService,
    ) {}

    async getAllSeasonCoefficients(req: Request, res: Response): Promise<void> {
        try {
            const coefficients: SeasonCoefficientsModel[] = await this.seasonCoefficientsService.getAllSeasonCoefficients();
            res.status(constants.HTTP_STATUS_OK).json(coefficients);
            return
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: (e as Error).message})
            return;
        }
    }

    async updateSeasonCoefficient(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { coefficient } = req.body;
            const coefficientUpdated: SeasonCoefficientsModel =
                await this.seasonCoefficientsService.updateSeasonCoefficient(
                    new UpdateSeasonCoefficientDto(Number(id), coefficient))
            res.status(constants.HTTP_STATUS_OK).json(coefficientUpdated)
            return;
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: (e as Error).message})
            return;
        }
    }
}