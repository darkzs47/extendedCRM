import {SeasonCoefficientsModel} from "../../../infrastructure/db/models/CoefficientModels/SeasonCoefficientsModel";
import {UpdateSeasonCoefficientDto} from "./dto/UpdateSeasonCoefficient";

export interface ISeasonCoefficientsRepository {
    getAllSeasonCoefficients(): Promise<SeasonCoefficientsModel[]>;
    updateSeasonCoefficient(dto: UpdateSeasonCoefficientDto): Promise<SeasonCoefficientsModel | null>;
}