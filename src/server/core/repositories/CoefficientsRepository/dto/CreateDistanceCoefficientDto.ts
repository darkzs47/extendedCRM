export class CreateDistanceCoefficientDto {
    constructor(
        readonly minKm: number,
        readonly maxKm: number,
        readonly coefficient: number,
    ) {}
}