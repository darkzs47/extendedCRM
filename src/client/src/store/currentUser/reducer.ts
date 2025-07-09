import {type UserActionTypes, type UserState} from "../../types/currentUser.ts";
import {LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT} from "../../types/currentUser.ts";

const initialState: UserState = {
    currentUser: null,
    isAuthUser: false,
    isLoading: true,
}

const currentUserReducer = (state = initialState, action: UserActionTypes): UserState => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                isAuthUser: true,
                isLoading: false
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                isAuthUser: false,
            }
        case LOGOUT:
            return {
                ...state,
                currentUser: null,
                isAuthUser: false,
                isLoading: false
            }
        default:
            return state;
    }
}

export default currentUserReducer;