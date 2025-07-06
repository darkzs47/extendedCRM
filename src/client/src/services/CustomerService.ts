import type {AxiosResponse} from "axios";
import api from "../http";
import type {CustomerResponse} from "../models/response/CustomerResponse.ts";
import type {CustomerFullInfoResponse} from "../models/response/CustomerFullInfoResponse.ts";

export default class CustomerService {
    static async getAll(): Promise<AxiosResponse<CustomerResponse>> {
        return api.get<CustomerResponse>("/customers/");
    }

    static async getById(id: number): Promise<AxiosResponse<CustomerFullInfoResponse>> {
        return api.get<CustomerFullInfoResponse>(`/customers/${id}`);
    }
}