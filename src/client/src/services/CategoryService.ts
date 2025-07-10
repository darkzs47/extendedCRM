import type {AxiosResponse} from "axios";
import api from "../http";
import type {CategoryResponse} from "../models/response/CategoryResponse.ts";
import type {UpdateMarkupRequest} from "../models/request/UpdateMarkupRequest.ts";
import type {DeleteRequest} from "../models/request/DeleteRequest.ts";
import type {AddCategoryRequest} from "../models/request/AddCategoryRequest.ts";
import type {AddResponse} from "../models/response/AddResponse.ts";

export default class CategoryService {
    static async getAllCategories(): Promise<AxiosResponse<CategoryResponse>> {
        return api.get<CategoryResponse>("/categories/");
    }

    static async updateMarkupCategory(request: UpdateMarkupRequest): Promise<AxiosResponse<void>> {
        return api.patch(`/categories/${request.id}`, request)
    }

    static async deleteCategory(request: DeleteRequest): Promise<AxiosResponse<void>> {
        return api.delete(`/categories/${request.id}`);
    }

    static async createCategory(request: AddCategoryRequest): Promise<AxiosResponse<AddResponse>> {
        return api.post(`/categories/`, request)
    }
}