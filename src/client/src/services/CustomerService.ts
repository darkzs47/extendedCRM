import type {AxiosResponse} from "axios";
import api from "../http";
import type {CustomerResponse} from "../models/response/CustomerResponse.ts";
import type {CustomerFullInfoResponse} from "../models/response/CustomerFullInfoResponse.ts";
import type {AddCustomerRequest} from "../models/request/AddCustomerRequest.ts";
import type {AddResponse} from "../models/response/AddResponse.ts";
import type {DeleteRequest} from "../models/request/DeleteRequest.ts";
import type {DiscountRequest} from "../models/request/DiscountRequest.ts";

export default class CustomerService {
    static async getAll(): Promise<AxiosResponse<CustomerResponse>> {
        return api.get<CustomerResponse>("/customers/");
    }

    static async getById(id: number): Promise<AxiosResponse<CustomerFullInfoResponse>> {
        return api.get<CustomerFullInfoResponse>(`/customers/${id}`);
    }

    static async create(request: AddCustomerRequest): Promise<AxiosResponse<AddResponse>> {
        return api.post<AddResponse>("/customers/", request);
    }

    static async deleteCustomer(request: DeleteRequest): Promise<AxiosResponse<void>> {
        return api.delete<void>(`/customers/${request.id}`);
    }

    static async updateDiscount(request: DiscountRequest): Promise<AxiosResponse<void>> {
        return api.patch<void>(`/customers/${request.id}`, request);
    }
}