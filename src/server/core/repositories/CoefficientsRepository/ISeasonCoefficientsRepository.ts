import {SeasonCoefficientModel} from "../../../infrastructure/db/models/CoefficientsModel/SeasonCoefficientModel";
import {UpdateSeasonCoefficientDto} from "./dto/UpdateSeasonCoefficient";

export interface ISeasonCoefficientsRepository {
    getAllSeasonCoefficients(): Promise<SeasonCoefficientModel[]>;
    getSeasonByName(name: string): Promise<SeasonCoefficientModel | null>;
    updateSeasonCoefficient(dto: UpdateSeasonCoefficientDto): Promise<SeasonCoefficientModel | null>;
}