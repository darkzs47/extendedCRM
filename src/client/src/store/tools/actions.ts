import type {Dispatch} from "redux";
import type {AddToolRequest} from "../../models/request/AddToolRequest.ts";
import type {DeleteRequest} from "../../models/request/DeleteRequest.ts";
import type {UpdateToolRequest} from "../../models/request/UpdateToolRequest.ts";
import {CREATE_TOOL, DELETE_TOOL, GET_TOOLS, TOOLS_FAILURE, UPDATE_TOOL} from "../../types/tools.ts";
import ToolService from "../../services/ToolService.ts";

export const getAllTools = () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await ToolService.getAllTools();
            dispatch({ type: GET_TOOLS, payload: response.data });
        } catch (e) {
            dispatch({ type: TOOLS_FAILURE })
        }
    }
}

export const createTool = (request: AddToolRequest) => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await ToolService.createTool(request);
            dispatch({type: CREATE_TOOL, payload: response.data});
        } catch (e) {
            dispatch({ type: TOOLS_FAILURE })
        }
    }
}

export const deleteTool = (request: DeleteRequest) => {
    return async (dispatch: Dispatch) => {
        try {
            await ToolService.deleteTool(request);
            dispatch({type: DELETE_TOOL, payload: request.id});
        } catch (e) {
            dispatch({ type: TOOLS_FAILURE })
        }
    }
}

export const updateTool = (request: UpdateToolRequest) => {
    return async (dispatch: Dispatch): Promise<{success: boolean}> => {
        try {
            await ToolService.updateTool(request);
            dispatch({type: UPDATE_TOOL, payload: {...request}});
            return { success: true };
        } catch (e) {
            dispatch({ type: TOOLS_FAILURE })
            return { success: false };
        }
    }
}



