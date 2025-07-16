import {DistanceCoefficientModel} from "../../../infrastructure/db/models/CoefficientsModels/DistanceCoefficientModel";
import {UpdateDistanceCoefficientDto} from "../../repositories/CoefficientsRepository/dto/UpdateDistanceCoefficientDto";
import {
    IDistanceCoefficientsRepository
} from "../../repositories/CoefficientsRepository/IDistanceCoefficientsRepository";
import {CreateDistanceCoefficientDto} from "../../repositories/CoefficientsRepository/dto/CreateDistanceCoefficientDto";

export class DistanceCoefficientsService {
    constructor(
        readonly distanceCoefficientsRepository: IDistanceCoefficientsRepository,
    ) {}

    async getAllDistanceCoefficients(): Promise<DistanceCoefficientModel[]> {
        const coefficients: DistanceCoefficientModel[] = await this.distanceCoefficientsRepository.getAllDistanceCoefficients()
        return coefficients;
    }

    async createDistanceCoefficient(dto: CreateDistanceCoefficientDto): Promise<DistanceCoefficientModel> {
        const newCoefficient: DistanceCoefficientModel | null = await this.distanceCoefficientsRepository.createDistanceCoefficient(dto)
        if (!newCoefficient) throw new Error("Коэффициент не создан");
        return newCoefficient;
    }

    async updateDistanceCoefficient(dto: UpdateDistanceCoefficientDto): Promise<DistanceCoefficientModel> {
        const coefficient: DistanceCoefficientModel | null = await this.distanceCoefficientsRepository.updateDistanceCoefficient(dto)
        if (!coefficient) throw new Error("Коэффициент не изменён");
        return coefficient;
    }

    async deleteDistanceCoefficient(id: number): Promise<DistanceCoefficientModel> {
        const coefficient: DistanceCoefficientModel | null = await this.distanceCoefficientsRepository.deleteDistanceCoefficient(id)
        if (!coefficient) throw new Error("Не удалось удалить коэффициент ");
        return coefficient;
    }
}