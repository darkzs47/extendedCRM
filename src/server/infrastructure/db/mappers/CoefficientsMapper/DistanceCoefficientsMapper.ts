import {DistanceCoefficients} from "../../../../core/models/Coefficients/Distance";
import {DistanceCoefficientsModel} from "../../models/CoefficientModels/DistanceCoefficientsModel";

type DistanceCoefficientsWithoutId = Omit<DistanceCoefficients, "id">;

export class DistanceCoefficientsMapper {
    static toModel(data: DistanceCoefficientsWithoutId): Partial<DistanceCoefficientsModel> {
        return {
            ...data,
        }
    }
}