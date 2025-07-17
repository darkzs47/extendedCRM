import {SeasonCoefficientsService} from "../../../core/services/CoefficientsService/SeasonCoefficientsService";
import {constants} from "http2";
import {SeasonCoefficientModel} from "../../db/models/CoefficientsModels/SeasonCoefficientModel";
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
            const coefficients: SeasonCoefficientModel[] = await this.seasonCoefficientsService.getAllSeasonCoefficients();
            res.status(constants.HTTP_STATUS_OK).json(coefficients);
            return
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: "Не удалось получить информацию об коэффициентах"})
            return;
        }
    }

    async updateSeasonCoefficient(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { coefficient } = req.body;
            const coefficientUpdated: SeasonCoefficientModel =
                await this.seasonCoefficientsService.updateSeasonCoefficient(
                    new UpdateSeasonCoefficientDto(Number(id), coefficient))
            res.status(constants.HTTP_STATUS_OK).json("Коэффициент изменён")
            return;
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: "Не удалось изменить коэффициент"})
            return;
        }
    }
}