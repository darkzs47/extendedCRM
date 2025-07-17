import {
    COEFFICIENTS_FAILURE,
    type CoefficientsActionTypes,
    type CoefficientsState,
    GET_COEFFICIENTS_SEASON, UPDATE_COEFFICIENTS_SEASON
} from "../../types/coefficients.ts";

const initialState: CoefficientsState = {
    seasons: null,
}

export const coefficientsReducer = (state = initialState, action: CoefficientsActionTypes) => {
    switch (action.type) {
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