import {
    USER_DELETE,
    USER_UPDATE,
    USERS_FAILURE,
    USERS_SUCCESS,
    type UsersActionTypes,
    type UsersState
} from "../../types/users.ts";

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
        case USER_DELETE:
            return {
                ...state,
                users: state.users
                    ? state.users.filter(user => user.id !== action.payload)
                    : null,
            }
        case USER_UPDATE:
            return {
                ...state,
                users: state.users
                    ? state.users.map(user =>
                        user.id === action.payload.id
                            ? { ...user, ...action.payload }
                            : user
                    )
                    : null,
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