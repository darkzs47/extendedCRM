import {type UserActionTypes, type UserState} from "../../types/user.ts";
import {LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT} from "../../types/user.ts";

const initialState: UserState = {
    user: null,
    isAuthUser: false,
}

const userReducer = (state = initialState, action: UserActionTypes): UserState => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isAuthUser: true
            }
        case LOGIN_FAILURE:
        case LOGOUT:
            return {
                ...state,
                user: null,
                isAuthUser: false
            }
        default:
            return state;
    }
}

export default userReducer;