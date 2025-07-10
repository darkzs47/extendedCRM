export type Seasons = 'Зима' | 'Весна' | 'Лето' | 'Осень';

export interface ICoefficientSeason {
    id: number;
    season: Seasons;
    coefficient: number;
}