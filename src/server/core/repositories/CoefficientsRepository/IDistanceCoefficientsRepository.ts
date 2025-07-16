import {DistanceCoefficientModel} from "../../../infrastructure/db/models/CoefficientsModels/DistanceCoefficientModel";
import {UpdateDistanceCoefficientDto} from "./dto/UpdateDistanceCoefficientDto";
import {CreateDistanceCoefficientDto} from "./dto/CreateDistanceCoefficientDto";

export interface IDistanceCoefficientsRepository {
    getAllDistanceCoefficients(): Promise<DistanceCoefficientModel[]>;
    createDistanceCoefficient(dto: CreateDistanceCoefficientDto): Promise<DistanceCoefficientModel | null>;
    updateDistanceCoefficient(dto: UpdateDistanceCoefficientDto): Promise<DistanceCoefficientModel | null>;
    deleteDistanceCoefficient(id: number): Promise<DistanceCoefficientModel | null>;
}