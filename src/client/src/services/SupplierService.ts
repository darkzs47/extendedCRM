import type {AxiosResponse} from "axios";
import api from "../http";
import type {DeleteRequest} from "../models/request/DeleteRequest.ts";
import type {AddSupplierRequest} from "../models/request/AddSupplierRequest.ts";
import type {AddSupplierResponse} from "../models/response/AddSupplierResponse.ts";
import type {SupplierFullInfoResponse} from "../models/response/SupplierFullInfoResponse.ts";
import type {SupplierResponse} from "../models/response/SupplierResponse.ts";

export default class SupplierService {
    static async getAll(): Promise<AxiosResponse<SupplierResponse>> {
        return api.get<SupplierResponse>("/suppliers/");
    }

    static async getById(id: number): Promise<AxiosResponse<SupplierFullInfoResponse>> {
        return api.get<SupplierFullInfoResponse>(`/suppliers/${id}`);
    }

    static async create(request: AddSupplierRequest): Promise<AxiosResponse<AddSupplierResponse>> {
        console.log(request);
        return api.post<AddSupplierResponse>("/suppliers/", request);
    }

    static async deleteSupplier(request: DeleteRequest): Promise<AxiosResponse<void>> {
        return api.delete<void>(`/suppliers/${request.id}`);
    }
}