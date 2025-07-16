import {ISeasonCoefficientsRepository} from "../../repositories/CoefficientsRepository/ISeasonCoefficientsRepository";
import {SeasonCoefficientModel} from "../../../infrastructure/db/models/CoefficientsModels/SeasonCoefficientModel";
import {UpdateSeasonCoefficientDto} from "../../repositories/CoefficientsRepository/dto/UpdateSeasonCoefficient";

export class SeasonCoefficientsService {
    constructor(
        readonly seasonCoefficientsRepository: ISeasonCoefficientsRepository,
    ) {}

    async getAllSeasonCoefficients(): Promise<SeasonCoefficientModel[]> {
        const coefficients: SeasonCoefficientModel[] = await this.seasonCoefficientsRepository.getAllSeasonCoefficients()
        return coefficients;
    }

    async updateSeasonCoefficient(dto: UpdateSeasonCoefficientDto): Promise<SeasonCoefficientModel> {
        const coefficient: SeasonCoefficientModel | null = await this.seasonCoefficientsRepository.updateSeasonCoefficient(dto)
        if (!coefficient) throw new Error("Коэффициент не изменён");
        return coefficient;
    }
}