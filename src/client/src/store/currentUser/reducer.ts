import {type UserActionTypes, type UserState} from "../../types/currentUser.ts";
import {LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT} from "../../types/currentUser.ts";

const initialState: UserState = {
    currentUser: null,
    isAuthUser: false,
}

const currentUserReducer = (state = initialState, action: UserActionTypes): UserState => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                isAuthUser: true
            }
        case LOGIN_FAILURE:
        case LOGOUT:
            return {
                ...state,
                currentUser: null,
                isAuthUser: false
            }
        default:
            return state;
    }
}

export default currentUserReducer;