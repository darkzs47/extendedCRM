import {type FC, memo, useEffect} from "react";
import type {IOrder} from "../../models/IOrder.ts";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store/store.ts";
import type { ICustomer } from "../../models/ICustomer.ts";
import {getAllCustomers} from "../../store/customers/actions.ts";
import {getAllOrders} from "../../store/orders/actions.ts";
import Order from "./rows/Order.tsx";

const OrdersTable: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const orders: IOrder[] | null = useSelector((state: RootState) => state.orders.orders)
    const customers: ICustomer[] | null = useSelector((state: RootState) => state.customers.customers)

    useEffect(() => {
        dispatch(getAllCustomers())
        dispatch(getAllOrders())
    }, [dispatch]);
    return (
        <table>
            <thead>
            <tr>
                <th>Заказчик</th>
                <th>Дата создания</th>
                <th>Дата завершения</th>
                <th>Статус</th>
                <th>Сумма</th>
                <th>Действия</th>
            </tr>
            </thead>
            <tbody>
                {orders?.map((order) => (
                    <tr
                        key={order.id}
                    >
                        <Order
                            order={order}
                            customer={customers?.find(c => c.id === order.customerId)?.companyName}
                        />
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default memo(OrdersTable)