import {
    COEFFICIENTS_FAILURE,
    type CoefficientsActionTypes,
    type CoefficientsState, CREATE_COEFFICIENT_DISTANCE, DELETE_COEFFICIENT_DISTANCE,
    GET_COEFFICIENTS_DISTANCE,
    GET_COEFFICIENTS_SEASON, UPDATE_COEFFICIENTS_DISTANCE, UPDATE_COEFFICIENTS_SEASON
} from "../../types/coefficients.ts";

const initialState: CoefficientsState = {
    distances: null,
    seasons: null,
}

export const coefficientsReducer = (state = initialState, action: CoefficientsActionTypes) => {
    switch (action.type) {
        case GET_COEFFICIENTS_DISTANCE:
            return {
                ...state,
                distances: action.payload
            }
        case UPDATE_COEFFICIENTS_DISTANCE:
            return {
                ...state,
                distances: state.distances
                    ? state.distances.map((distance) =>
                            distance.id === action.payload.id
                                ? {...distance, ...action.payload}
                                : distance)
                    : null

            }
        case CREATE_COEFFICIENT_DISTANCE:
            return {
                ...state,
                distances: state.distances
                    ? [...state.distances, action.payload]
                    : [action.payload]
            }
        case DELETE_COEFFICIENT_DISTANCE:
            return {
                ...state,
                distances: state.distances
                    ? state.distances.filter(distance => distance.id !== action.payload)
                    : null
            }
        case GET_COEFFICIENTS_SEASON:
            return {
                ...state,
                seasons: action.payload
            }
        case UPDATE_COEFFICIENTS_SEASON:
            return {
                ...state,
                seasons: state.seasons
                    ? state.seasons.map((season) =>
                        season.id === action.payload.id
                            ? {...season, ...action.payload}
                            : season)
                    : null
            }
        case COEFFICIENTS_FAILURE:
            return {
                ...state
            }
        default:
            return state
    }
}