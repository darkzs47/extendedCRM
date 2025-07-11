import {
    CATEGORIES_FAILURE,
    type CategoriesActionTypes,
    type CategoriesState, CREATE_CATEGORY,
    DELETE_CATEGORY,
    GET_CATEGORIES,
    UPDATE_MARKUP
} from "../../types/categories.ts";

const initialState: CategoriesState = {
    categories: null,
}

export const categoriesReducer = (state = initialState, action: CategoriesActionTypes) => {
    switch (action.type) {
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            }
        case CREATE_CATEGORY:
            return {
                ...state,
                categories: state.categories
                    ? [...state.categories, action.payload]
                    : [action.payload],
            }
        case UPDATE_MARKUP:
            return {
                ...state,
                categories: state.categories
                    ? state.categories.map(category =>
                        category.id === action.payload.id
                            ? {...category, ...action.payload}
                            : category)
                    : null,
            }
        case DELETE_CATEGORY:
            return {
                ...state,
                categories: state.categories
                    ? state.categories.filter(category => category.id !== action.payload)
                    : null,
            }
        case CATEGORIES_FAILURE:
            return {
                ...state
            }
        default:
            return state;
    }
}