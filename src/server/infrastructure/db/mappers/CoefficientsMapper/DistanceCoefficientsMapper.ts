import {DistanceCoefficients} from "../../../../core/models/Coefficients/Distance";
import {DistanceCoefficientModel} from "../../models/CoefficientsModels/DistanceCoefficientModel";

type DistanceCoefficientsWithoutId = Omit<DistanceCoefficients, "id">;

export class DistanceCoefficientsMapper {
    static toModel(data: DistanceCoefficientsWithoutId): Partial<DistanceCoefficientModel> {
        return {
            ...data,
        }
    }
}