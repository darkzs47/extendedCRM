import type {AxiosResponse} from "axios";
import api from "../http";
import type {AddOrderRequest} from "../models/request/AddOrderRequest.ts";
import type {DeleteRequest} from "../models/request/DeleteRequest.ts";
import type {UpdateStatusOrderRequest} from "../models/request/UpdateStatusOrderRequest.ts";
import type {AddResponse} from "../models/response/AddResponse.ts";
import type {OrderResponse} from "../models/response/OrderResponse.ts";

export default class OrderService{
    static async getAllOrders(): Promise<AxiosResponse<OrderResponse>> {
        return api.get<OrderResponse>('/orders/')
    }

    static async getOrderById(id: number): Promise<AxiosResponse<OrderResponse>> {
        return api.get<OrderResponse>(`/orders/${id}`)
    }

    static async createOrder(request: AddOrderRequest): Promise<AxiosResponse<AddResponse>> {
        return api.post<AddResponse>('/orders/', request)
    }

    static async updateStatusOrder(request: UpdateStatusOrderRequest): Promise<AxiosResponse> {
        return api.patch(`/orders/${request.id}`, request)
    }

    static async deleteOrder(request: DeleteRequest): Promise<AxiosResponse> {
        return api.delete(`/orders/${request.id}`)
    }

};