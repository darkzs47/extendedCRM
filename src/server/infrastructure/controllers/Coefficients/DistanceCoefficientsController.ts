import { DistanceCoefficientsService } from "../../../core/services/CoefficientsService/DistanceCoefficientsService";
import {constants} from "http2";
import {Request, Response} from "express";
import {DistanceCoefficientsModel} from "../../db/models/CoefficientModels/DistanceCoefficientsModel";
import {
    UpdateDistanceCoefficientDto
} from "../../../core/repositories/CoefficientsRepository/dto/UpdateDistanceCoefficientDto";
import {
    CreateDistanceCoefficientDto
} from "../../../core/repositories/CoefficientsRepository/dto/CreateDistanceCoefficientDto";

export class DistanceCoefficientsController {
    constructor(
        private readonly distanceCoefficientsService: DistanceCoefficientsService
    ) {}

    async getAllDistanceCoefficients(req: Request, res: Response): Promise<void> {
        try {
            const coefficients: DistanceCoefficientsModel[] = await this.distanceCoefficientsService.getAllDistanceCoefficients();
            res.status(constants.HTTP_STATUS_OK).json(coefficients);
            return
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: (e as Error).message})
            return;
        }
    }

    async createDistanceCoefficient(req: Request, res: Response): Promise<void> {
        try {
            const { minKm, maxKm, coefficient } = req.body;
            const newCoefficient: DistanceCoefficientsModel =
                await this.distanceCoefficientsService.createDistanceCoefficient(
                    new CreateDistanceCoefficientDto(minKm, maxKm, coefficient))
            res.status(constants.HTTP_STATUS_OK).json(newCoefficient)
            return
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: (e as Error).message})
            return;
        }
    }

    async updateDistanceCoefficient(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { coefficient } = req.body;
            const coefficientUpdated: DistanceCoefficientsModel =
                await this.distanceCoefficientsService.updateDistanceCoefficient(
                    new UpdateDistanceCoefficientDto(Number(id), coefficient))
            res.status(constants.HTTP_STATUS_OK).json(coefficientUpdated)
            return;
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: (e as Error).message})
            return;
        }
    }

    async deleteDistanceCoefficient(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await this.distanceCoefficientsService.deleteDistanceCoefficient(Number(id))
            res.status(constants.HTTP_STATUS_OK).json({message: 'Коэффициент успешно удален'})
        } catch (e) {
            res.status(constants.HTTP_STATUS_CONFLICT).json({message: (e as Error).message})
            return;
        }
    }
}