import {
    ISeasonCoefficientsRepository
} from "../../../core/repositories/CoefficientsRepository/ISeasonCoefficientsRepository";
import {SeasonCoefficientsModel} from "../models/CoefficientModels/SeasonCoefficientsModel";
import {
    UpdateSeasonCoefficientDto
} from "../../../core/repositories/CoefficientsRepository/dto/UpdateSeasonCoefficient";

export class SeasonCoefficientsRepository implements ISeasonCoefficientsRepository {
    async getAllSeasonCoefficients(): Promise<SeasonCoefficientsModel[]> {
        const coefficients: SeasonCoefficientsModel[] = await SeasonCoefficientsModel.findAll()
        return coefficients;
    }

    async updateSeasonCoefficient(dto: UpdateSeasonCoefficientDto): Promise<SeasonCoefficientsModel | null> {
        const coefficient: SeasonCoefficientsModel | null = await SeasonCoefficientsModel.findByPk(dto.id)

        coefficient ? await coefficient.update({
            coefficient: dto.coefficient,
        }) : null;

        return coefficient;
    }
}