export type Seasons = 'Зима' | 'Весна' | 'Лето' | 'Осень';

export class SeasonCoefficients {
    constructor(
        readonly id: number,
        readonly season: Seasons,
        readonly coefficient: number,
    ) {}
}