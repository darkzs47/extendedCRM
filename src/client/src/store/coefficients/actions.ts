import type {Dispatch} from "redux";
import {
    COEFFICIENTS_FAILURE,
    CREATE_COEFFICIENT_DISTANCE,
    DELETE_COEFFICIENT_DISTANCE,
    GET_COEFFICIENTS_SEASON, UPDATE_COEFFICIENTS_DISTANCE, UPDATE_COEFFICIENTS_SEASON
} from "../../types/coefficients.ts";
import {CoefficientsService} from "../../services/CoefficientsService.ts";
import type {CoefficientsDistanceRequest} from "../../models/request/CoefficientsDistanceRequest.ts";
import type {DeleteRequest} from "../../models/request/DeleteRequest.ts";
import type {UpdateSeasonCoefficientsRequest} from "../../models/request/UpdateSeasonCoefficientsRequest.ts";
import type {UpdateDistanceCoefficientsRequest} from "../../models/request/UpdateDistanceCoefficientsRequest.ts";

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

export const getDistanceCoefficients = () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await CoefficientsService.getDistanceCoefficients()
            dispatch({ type: GET_COEFFICIENTS_SEASON, payload: response.data })
        } catch (e) {
            dispatch({ type: COEFFICIENTS_FAILURE })
        }
    }
}

export const createDistanceCoefficients = (request: CoefficientsDistanceRequest) => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await CoefficientsService.createDistanceCoefficients(request)
            dispatch({ type: CREATE_COEFFICIENT_DISTANCE, payload: response.data })
        } catch (e) {
            dispatch({ type: COEFFICIENTS_FAILURE })
        }
    }
}

export const deleteDistanceCoefficients = (request: DeleteRequest) => {
    return async (dispatch: Dispatch) => {
        try {
            await CoefficientsService.deleteDistanceCoefficients(request)
            dispatch({ type: DELETE_COEFFICIENT_DISTANCE, payload: request.id })
        } catch (e) {
            dispatch({ type: COEFFICIENTS_FAILURE })
        }
    }
}

export const updateDistanceCoefficients = (request: UpdateDistanceCoefficientsRequest) => {
    return async (dispatch: Dispatch) => {
        try {
            await CoefficientsService.updateDistanceCoefficients(request)
            dispatch({ type: UPDATE_COEFFICIENTS_DISTANCE, payload: {...request} })
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