import type {AxiosResponse} from "axios";
import api from "../http";
import type {CustomerResponse} from "../models/response/CustomerResponse.ts";

export default class CustomerService {
    static getAll(): Promise<AxiosResponse<CustomerResponse>> {
        return api.get<CustomerResponse>("/customers/");
    }
}