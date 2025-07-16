import {
    IDistanceCoefficientsRepository
} from "../../../core/repositories/CoefficientsRepository/IDistanceCoefficientsRepository";
import {
    CreateDistanceCoefficientDto
} from "../../../core/repositories/CoefficientsRepository/dto/CreateDistanceCoefficientDto";
import {DistanceCoefficientsModel} from "../models/CoefficientModels/DistanceCoefficientsModel";
import {
    UpdateDistanceCoefficientDto
} from "../../../core/repositories/CoefficientsRepository/dto/UpdateDistanceCoefficientDto";
import {DistanceCoefficientsMapper} from "../mappers/CoefficientsMapper/DistanceCoefficientsMapper";

export class DistanceCoefficientsRepository implements IDistanceCoefficientsRepository {
    async getAllDistanceCoefficients(): Promise<DistanceCoefficientsModel[]> {
        const coefficients: DistanceCoefficientsModel[] = await DistanceCoefficientsModel.findAll()
        return coefficients;
    }

    async createDistanceCoefficient(dto: CreateDistanceCoefficientDto): Promise<DistanceCoefficientsModel | null> {
        const coefficient: DistanceCoefficientsModel | null =
            await DistanceCoefficientsModel.create(DistanceCoefficientsMapper.toModel(dto))
        return coefficient;
    }


    async updateDistanceCoefficient(dto: UpdateDistanceCoefficientDto): Promise<DistanceCoefficientsModel | null> {
        const coefficient: DistanceCoefficientsModel | null = await DistanceCoefficientsModel.findByPk(dto.id)
        coefficient ? await coefficient.update({
            coefficient: dto.coefficient,
        }) : null
        return coefficient;
    }

    async deleteDistanceCoefficient(id: number): Promise<DistanceCoefficientsModel | null> {
        const coefficient: DistanceCoefficientsModel | null = await DistanceCoefficientsModel.findByPk(id)
        coefficient ? await coefficient.destroy() : null
        return coefficient;
    }
}