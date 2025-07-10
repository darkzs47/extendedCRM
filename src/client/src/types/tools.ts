import type {ITool} from "../models/ITool.ts";

export const GET_TOOLS = 'GET_TOOLS';
export const CREATE_TOOL = 'CREATE_TOOL' ;
export const UPDATE_TOOL = 'UPDATE_TOOL';
export const DELETE_TOOL = 'DELETE_TOOL';
export const TOOLS_FAILURE = 'TOOLS_FAILURE';

export interface ToolsState {
    tools: ITool[] | null;
}

export interface GetToolsAction {
    type: typeof GET_TOOLS;
    payload: ITool[];
}

export interface CreateToolAction {
    type: typeof CREATE_TOOL;
    payload: ITool;
}

export interface UpdateToolAction {
    type: typeof UPDATE_TOOL;
    payload: {
        id: number;
        purchasePrice: number;
        sellPrice: number;
        supplierId: number;
    };
}

export interface DeleteToolAction {
    type: typeof DELETE_TOOL;
    payload: number;
}

export interface ToolsFailureAction {
    type: typeof TOOLS_FAILURE;
}

export type ToolsActionTypes = GetToolsAction |
    CreateToolAction |
    UpdateToolAction |
    DeleteToolAction |
    ToolsFailureAction;