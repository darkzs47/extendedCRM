import {DistanceCoefficientsModel} from "../../../infrastructure/db/models/CoefficientModels/DistanceCoefficientsModel";
import {UpdateDistanceCoefficientDto} from "./dto/UpdateDistanceCoefficientDto";
import {CreateDistanceCoefficientDto} from "./dto/CreateDistanceCoefficientDto";

export interface IDistanceCoefficientsRepository {
    getAllDistanceCoefficients(): Promise<DistanceCoefficientsModel[]>;
    createDistanceCoefficient(dto: CreateDistanceCoefficientDto): Promise<DistanceCoefficientsModel | null>;
    updateDistanceCoefficient(dto: UpdateDistanceCoefficientDto): Promise<DistanceCoefficientsModel | null>;
    deleteDistanceCoefficient(id: number): Promise<DistanceCoefficientsModel | null>;
}