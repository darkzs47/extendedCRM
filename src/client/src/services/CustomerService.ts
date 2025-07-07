import type {AxiosResponse} from "axios";
import api from "../http";
import type {CustomerResponse} from "../models/response/CustomerResponse.ts";
import type {CustomerFullInfoResponse} from "../models/response/CustomerFullInfoResponse.ts";
import type {AddCustomerRequest} from "../models/request/AddCustomerRequest.ts";
import type {AddCustomerResponse} from "../models/response/AddCustomerResponse.ts";

export default class CustomerService {
    static async getAll(): Promise<AxiosResponse<CustomerResponse>> {
        return api.get<CustomerResponse>("/customers/");
    }

    static async getById(id: number): Promise<AxiosResponse<CustomerFullInfoResponse>> {
        return api.get<CustomerFullInfoResponse>(`/customers/${id}`);
    }

    static async create(request: AddCustomerRequest): Promise<AxiosResponse<AddCustomerResponse>> {
        console.log(request);
        return api.post<AddCustomerResponse>("/customers/", request);
    }
}