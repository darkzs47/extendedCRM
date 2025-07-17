import type {Dispatch} from "redux";
import {
    COEFFICIENTS_FAILURE,
    GET_COEFFICIENTS_SEASON, UPDATE_COEFFICIENTS_SEASON
} from "../../types/coefficients.ts";
import {CoefficientsService} from "../../services/CoefficientsService.ts";
import type {UpdateSeasonCoefficientsRequest} from "../../models/request/UpdateSeasonCoefficientsRequest.ts";

export const getSeasonCoefficients = () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await CoefficientsService.getSeasonCoefficients()
            dispatch({ type: GET_COEFFICIENTS_SEASON, payload: response.data })
        } catch (e) {
            dispatch({ type: COEFFICIENTS_FAILURE })
        }
    }
}

export const updateSeasonCoefficients = (request: UpdateSeasonCoefficientsRequest) => {
    return async (dispatch: Dispatch) => {
        try {
            await CoefficientsService.updateSeasonCoefficients(request)
            dispatch({ type: UPDATE_COEFFICIENTS_SEASON, payload: {...request} })
        } catch (e) {
            dispatch({ type: COEFFICIENTS_FAILURE })
        }
    }
}