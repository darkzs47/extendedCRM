import type {ICoefficientDistance} from "../models/ICoefficientDistance.ts";
import type {ICoefficientSeason} from "../models/ICoefficientSeason.ts";

export interface CoefficientsState {
    distances: ICoefficientDistance[] | null;
    seasons: ICoefficientSeason[] | null;
}

export const GET_COEFFICIENTS_DISTANCE = "GET_COEFFICIENTS_DISTANCE";
export const UPDATE_COEFFICIENTS_DISTANCE = "UPDATE_COEFFICIENTS_DISTANCE";
export const DELETE_COEFFICIENT_DISTANCE = "DELETE_COEFFICIENT_DISTANCE";
export const CREATE_COEFFICIENT_DISTANCE = "CREATE_COEFFICIENT_DISTANCE";
export const GET_COEFFICIENTS_SEASON = "GET_COEFFICIENTS_SEASON";
export const UPDATE_COEFFICIENTS_SEASON = "UPDATE_COEFFICIENTS_SEASON";
export const COEFFICIENTS_FAILURE = "COEFFICIENTS_FAILURE";

export interface GetCoefficientsDistanceAction {
    type: typeof GET_COEFFICIENTS_DISTANCE;
    payload: ICoefficientDistance[];
}

export interface UpdateCoefficientDistanceAction {
    type: typeof UPDATE_COEFFICIENTS_DISTANCE;
    payload: ICoefficientDistance;
}

export interface DeleteCoefficientDistanceAction {
    type: typeof DELETE_COEFFICIENT_DISTANCE;
    payload: number;
}

export interface CreateCoefficientDistanceAction {
    type: typeof CREATE_COEFFICIENT_DISTANCE;
    payload: ICoefficientDistance;
}

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
    GetCoefficientsDistanceAction |
    UpdateCoefficientDistanceAction |
    DeleteCoefficientDistanceAction |
    CreateCoefficientDistanceAction |
    GetCoefficientsSeasonAction |
    UpdateCoefficientSeasonAction |
    CoefficientsFailureAction;