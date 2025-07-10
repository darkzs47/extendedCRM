import type {ICategory} from "../models/ICategory.ts";

export const GET_CATEGORIES = "GET_CATEGORIES";
export const CATEGORIES_FAILURE = "CATEGORIES_FAILURE";
export const UPDATE_MARKUP = "UPDATE_MARKUP";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const CREATE_CATEGORY = "CREATE_CATEGORY";


export interface CategoriesState {
    categories: ICategory[] | null;
}

export interface GetCategoriesSuccessAction {
    type: typeof GET_CATEGORIES;
    payload: ICategory[];
}

export interface DeleteCategoryAction {
    type: typeof DELETE_CATEGORY;
    payload: number;
}

export interface CategoriesFailureAction {
    type: typeof CATEGORIES_FAILURE;
}

export interface CategoryUpdateMarkupAction {
    type: typeof UPDATE_MARKUP;
    payload: {
        id: number;
        markup: number;
    }
}

export interface CreateCategoryAction {
    type: typeof CREATE_CATEGORY;
    payload: {
        id: number;
        name: string;
        markup: number;
    }
}

export type CategoriesActionTypes =
    GetCategoriesSuccessAction |
    DeleteCategoryAction |
    CategoriesFailureAction |
    CategoryUpdateMarkupAction |
    CreateCategoryAction;