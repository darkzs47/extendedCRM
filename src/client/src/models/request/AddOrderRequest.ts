export interface AddOrderRequest {
    tools: {
        toolId: number,
        quantityTools: number
    },
    customerId: number,
}