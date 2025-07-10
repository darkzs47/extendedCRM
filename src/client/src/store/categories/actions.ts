import type {Dispatch} from "redux";
import CategoryService from "../../services/CategoryService.ts";
import {
    CATEGORIES_FAILURE,
    CREATE_CATEGORY,
    DELETE_CATEGORY,
    GET_CATEGORIES,
    UPDATE_MARKUP
} from "../../types/categories.ts";
import type {DeleteRequest} from "../../models/request/DeleteRequest.ts";
import type {UpdateMarkupRequest} from "../../models/request/UpdateMarkupRequest.ts";
import type {AddCategoryRequest} from "../../models/request/AddCategoryRequest.ts";

export const getAllCategories = () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await CategoryService.getAllCategories();
            dispatch({ type: GET_CATEGORIES, payload: response.data });
        } catch (e) {
            dispatch({type: CATEGORIES_FAILURE});
        }
    }
}

export const createCategory = (request: AddCategoryRequest) => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await CategoryService.createCategory(request);
            dispatch({type: CREATE_CATEGORY, payload: response.data});
        } catch (e) {
            dispatch({ type: CATEGORIES_FAILURE })
        }
    }
}

export const deleteCategory = (request: DeleteRequest) => {
    return async (dispatch: Dispatch) => {
        try {
            await CategoryService.deleteCategory(request);
            dispatch({ type: DELETE_CATEGORY, payload: request.id});
        } catch (e) {
            dispatch({ type: CATEGORIES_FAILURE })
        }
    }
}

export const updateMarkupCategory = (request: UpdateMarkupRequest) => {
    return async (dispatch: Dispatch) => {
        try {
            await CategoryService.updateMarkupCategory(request);
            dispatch({ type: UPDATE_MARKUP, payload: {...request} });
        } catch (e) {
            dispatch({ type: CATEGORIES_FAILURE })
        }
    }
}