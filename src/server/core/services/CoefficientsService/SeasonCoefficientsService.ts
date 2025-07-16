import {ISeasonCoefficientsRepository} from "../../repositories/CoefficientsRepository/ISeasonCoefficientsRepository";
import {SeasonCoefficientsModel} from "../../../infrastructure/db/models/CoefficientModels/SeasonCoefficientsModel";
import {UpdateSeasonCoefficientDto} from "../../repositories/CoefficientsRepository/dto/UpdateSeasonCoefficient";

export class SeasonCoefficientService {
    constructor(
        readonly seasonCoefficientsRepository: ISeasonCoefficientsRepository,
    ) {}

    async getAllSeasonCoefficients(): Promise<SeasonCoefficientsModel[]> {
        const coefficients: SeasonCoefficientsModel[] = await this.seasonCoefficientsRepository.getAllSeasonCoefficients()
        return coefficients;
    }

    async updateSeasonCoefficient(dto: UpdateSeasonCoefficientDto): Promise<SeasonCoefficientsModel> {
        const coefficient: SeasonCoefficientsModel | null = await this.seasonCoefficientsRepository.updateSeasonCoefficient(dto)
        if (!coefficient) throw new Error("Коэффициент не изменён");
        return coefficient;
    }
}