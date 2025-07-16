import {DistanceCoefficientsModel} from "../../../infrastructure/db/models/CoefficientModels/DistanceCoefficientsModel";
import {UpdateDistanceCoefficientDto} from "../../repositories/CoefficientsRepository/dto/UpdateDistanceCoefficientDto";
import {
    IDistanceCoefficientsRepository
} from "../../repositories/CoefficientsRepository/IDistanceCoefficientsRepository";
import {CreateDistanceCoefficientDto} from "../../repositories/CoefficientsRepository/dto/CreateDistanceCoefficientDto";

export class DistanceCoefficientsService {
    constructor(
        readonly distanceCoefficientsRepository: IDistanceCoefficientsRepository,
    ) {}

    async getAllDistanceCoefficients(): Promise<DistanceCoefficientsModel[]> {
        const coefficients: DistanceCoefficientsModel[] = await this.distanceCoefficientsRepository.getAllDistanceCoefficients()
        return coefficients;
    }

    async createDistanceCoefficient(dto: CreateDistanceCoefficientDto): Promise<DistanceCoefficientsModel> {
        const coefficient: DistanceCoefficientsModel | null = await this.distanceCoefficientsRepository.createDistanceCoefficient(dto)
        if (!coefficient) throw new Error("Коэффициент не создан");
        return coefficient;
    }

    async updateDistanceCoefficient(dto: UpdateDistanceCoefficientDto): Promise<DistanceCoefficientsModel> {
        const coefficient: DistanceCoefficientsModel | null = await this.distanceCoefficientsRepository.updateDistanceCoefficient(dto)
        if (!coefficient) throw new Error("Коэффициент не изменён");
        return coefficient;
    }

    async deleteDistanceCoefficient(id: number): Promise<DistanceCoefficientsModel> {
        const coefficient: DistanceCoefficientsModel | null = await this.distanceCoefficientsRepository.deleteDistanceCoefficient(id)
        if (!coefficient) throw new Error("Коэффициент не удалён");
        return coefficient;
    }
}