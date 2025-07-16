import {
    IDistanceCoefficientsRepository
} from "../../../core/repositories/CoefficientsRepository/IDistanceCoefficientsRepository";
import {
    CreateDistanceCoefficientDto
} from "../../../core/repositories/CoefficientsRepository/dto/CreateDistanceCoefficientDto";
import {DistanceCoefficientModel} from "../models/CoefficientsModels/DistanceCoefficientModel";
import {
    UpdateDistanceCoefficientDto
} from "../../../core/repositories/CoefficientsRepository/dto/UpdateDistanceCoefficientDto";
import {DistanceCoefficientsMapper} from "../mappers/CoefficientsMapper/DistanceCoefficientsMapper";

export class DistanceCoefficientsRepository implements IDistanceCoefficientsRepository {
    async getAllDistanceCoefficients(): Promise<DistanceCoefficientModel[]> {
        const coefficients: DistanceCoefficientModel[] = await DistanceCoefficientModel.findAll()
        return coefficients;
    }

    async createDistanceCoefficient(dto: CreateDistanceCoefficientDto): Promise<DistanceCoefficientModel | null> {
        const coefficient: DistanceCoefficientModel | null =
            await DistanceCoefficientModel.create(DistanceCoefficientsMapper.toModel(dto))
        return coefficient;
    }


    async updateDistanceCoefficient(dto: UpdateDistanceCoefficientDto): Promise<DistanceCoefficientModel | null> {
        const coefficient: DistanceCoefficientModel | null = await DistanceCoefficientModel.findByPk(dto.id)
        coefficient ? await coefficient.update({
            coefficient: dto.coefficient,
        }) : null
        return coefficient;
    }

    async deleteDistanceCoefficient(id: number): Promise<DistanceCoefficientModel | null> {
        const coefficient: DistanceCoefficientModel | null = await DistanceCoefficientModel.findByPk(id)
        coefficient ? await coefficient.destroy() : null
        return coefficient;
    }
}