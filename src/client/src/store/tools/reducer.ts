import {
    CREATE_TOOL,
    DELETE_TOOL,
    GET_TOOLS,
    TOOLS_FAILURE,
    type ToolsActionTypes,
    type ToolsState,
    UPDATE_TOOL
} from "../../types/tools.ts";

const initialState: ToolsState = {
    tools: null,
}

export const toolsReducer = (state = initialState, action: ToolsActionTypes) => {
    switch (action.type) {
        case GET_TOOLS:
            return {
                ...state,
                tools: action.payload,
            }
        case CREATE_TOOL:
            return {
                ...state,
                tools: [
                    state.tools ? {...state.tools} : null,
                    {
                        ...action.payload,
                    }],
            }
        case UPDATE_TOOL:
            return {
                ...state,
                tools: state.tools
                    ? state.tools.map(tool =>
                        tool.id === action.payload.id
                            ? {...tool, ...action.payload}
                            : tool
                    ) : null,
            }
        case DELETE_TOOL:
            return {
                ...state,
                tools: state.tools?.filter(tool => tool.id !== action.payload)
            }
        case TOOLS_FAILURE:
            return {
                ...state,
            }
        default:
            return state
    }
}