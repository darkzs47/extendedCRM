import type {ICoefficientSeason} from "../models/ICoefficientSeason.ts";

export interface CoefficientsState {
    seasons: ICoefficientSeason[] | null;
}

export const GET_COEFFICIENTS_SEASON = "GET_COEFFICIENTS_SEASON";
export const UPDATE_COEFFICIENTS_SEASON = "UPDATE_COEFFICIENTS_SEASON";
export const COEFFICIENTS_FAILURE = "COEFFICIENTS_FAILURE";

export interface GetCoefficientsSeasonAction {
    type: typeof GET_COEFFICIENTS_SEASON;
    payload: ICoefficientSeason[];
}

export interface UpdateCoefficientSeasonAction {
    type: typeof UPDATE_COEFFICIENTS_SEASON;
    payload: Omit<ICoefficientSeason, 'season'>
}

export interface CoefficientsFailureAction {
    type: typeof COEFFICIENTS_FAILURE;
}

export type CoefficientsActionTypes =
    GetCoefficientsSeasonAction |
    UpdateCoefficientSeasonAction |
    CoefficientsFailureAction;