import type {AxiosResponse} from "axios";
import api from "../http";
import type { AddResponse } from "../models/response/AddResponse";
import type {DeleteRequest} from "../models/request/DeleteRequest.ts";
import type {ToolResponse} from "../models/response/ToolResponse.ts";
import type {AddToolRequest} from "../models/request/AddToolRequest.ts";
import type {UpdateToolRequest} from "../models/request/UpdateToolRequest.ts";

export default class ToolService {
    static async getAllTools(): Promise<AxiosResponse<ToolResponse>> {
        return api.get<ToolResponse>('/tools/');
    }

    static async createTool(request: AddToolRequest): Promise<AxiosResponse<AddResponse>> {
        console.log(request);
        return api.post<AddResponse>(`/tools/`, request);
    }

    static async updateTool(request: UpdateToolRequest): Promise<AxiosResponse> {
        return api.patch(`/tools/${request.id}`, request);
    }

    static async deleteTool(request: DeleteRequest): Promise<AxiosResponse> {
        return api.delete(`/tools/${request.id}`);
    }
}