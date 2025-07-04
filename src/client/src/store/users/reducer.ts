import {USERS_FAILURE, USERS_SUCCESS, type UsersActionTypes, type UsersState} from "../../types/users.ts";

const initialState: UsersState = {
    users: null,
}

export const usersReducer = (state = initialState, action: UsersActionTypes) => {
    switch (action.type) {
        case USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
            }
        case USERS_FAILURE:
            return {
                ...state,
                users: null,
            }
        default:
            return state;
    }
}