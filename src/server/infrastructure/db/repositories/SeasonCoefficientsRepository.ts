import {
    ISeasonCoefficientsRepository
} from "../../../core/repositories/CoefficientsRepository/ISeasonCoefficientsRepository";
import {SeasonCoefficientModel} from "../models/CoefficientsModel/SeasonCoefficientModel";
import {
    UpdateSeasonCoefficientDto
} from "../../../core/repositories/CoefficientsRepository/dto/UpdateSeasonCoefficient";

export class SeasonCoefficientsRepository implements ISeasonCoefficientsRepository {
    async getAllSeasonCoefficients(): Promise<SeasonCoefficientModel[]> {
        const coefficients: SeasonCoefficientModel[] = await SeasonCoefficientModel.findAll()
        return coefficients;
    }

    async getSeasonByName(name: string): Promise<SeasonCoefficientModel | null> {
        const coefficient: SeasonCoefficientModel | null = await SeasonCoefficientModel.findOne({
            where: {season: name}
        })
        return coefficient;
    }

    async updateSeasonCoefficient(dto: UpdateSeasonCoefficientDto): Promise<SeasonCoefficientModel | null> {
        const coefficient: SeasonCoefficientModel | null = await SeasonCoefficientModel.findByPk(dto.id)

        coefficient ? await coefficient.update({
            coefficient: dto.coefficient,
        }) : null;

        return coefficient;
    }
}