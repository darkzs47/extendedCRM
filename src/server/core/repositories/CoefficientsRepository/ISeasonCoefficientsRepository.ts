import {SeasonCoefficientModel} from "../../../infrastructure/db/models/CoefficientsModels/SeasonCoefficientModel";
import {UpdateSeasonCoefficientDto} from "./dto/UpdateSeasonCoefficient";

export interface ISeasonCoefficientsRepository {
    getAllSeasonCoefficients(): Promise<SeasonCoefficientModel[]>;
    updateSeasonCoefficient(dto: UpdateSeasonCoefficientDto): Promise<SeasonCoefficientModel | null>;
}