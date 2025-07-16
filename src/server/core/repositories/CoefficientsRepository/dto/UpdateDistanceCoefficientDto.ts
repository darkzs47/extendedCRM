export class UpdateDistanceCoefficientDto {
    constructor(
        readonly minKm?: number,
        readonly maxKm?: number,
        readonly coefficient?: number,
    ) {}
}