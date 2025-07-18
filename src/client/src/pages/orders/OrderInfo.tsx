import {type FC, memo, useEffect, useMemo} from "react";
import type {IOrder} from "../../models/IOrder.ts";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store/store.ts";
import {useParams} from "react-router-dom";
import {getAllOrders} from "../../store/orders/actions.ts";
import type {ICustomer} from "../../models/ICustomer.ts";
import {getAllCustomers} from "../../store/customers/actions.ts";
import dayjs from "dayjs";
import styles from "./orderInfo.module.scss"

const OrderInfo: FC = () => {
    const dispatch = useDispatch<AppDispatch>()

    const {id} = useParams()
    const orders: IOrder[] | null = useSelector((state: RootState) => state.orders.orders)
    const customers: ICustomer[] | null = useSelector((state: RootState) => state.customers.customers)

    const currentOrder = useMemo(() => {
        return orders?.find(order => order.id === Number(id));
    }, [orders, id]);

    const customerName = useMemo(() => {
        return customers?.find(customer => customer.id === currentOrder?.customerId)?.companyName;
    }, [customers, currentOrder?.customerId]);

    useEffect(() => {
        dispatch(getAllOrders())
        dispatch(getAllCustomers())
    }, [dispatch]);

    return (
        <main className={styles.container}>
            <div>
                <h3>Информация о заказе</h3>
                <div className={styles.infoContainer}>
                    <div>Клиент: {customerName}</div>
                    <div>Дата
                        создания: {currentOrder?.createdAt ? dayjs(currentOrder.createdAt).format('DD.MM.YYYY') : '—'}</div>
                    <div>Дата
                        завершения: {currentOrder?.completedAt ? dayjs(currentOrder.completedAt).format('DD.MM.YYYY') : '—'}</div>
                    <div>Статус: {currentOrder?.status}</div>
                    <div>Итоговая цена заказа: {currentOrder?.finalPrice} ₽</div>
                </div>
            </div>

            <div>
                <h3>Содержимое заказа</h3>
                <div className={styles.tableContainer}>
                    <table>
                        <thead>
                        <tr>
                            <th>Инструмент</th>
                            <th>Количество</th>
                            <th>Цена за ед., ₽</th>
                            <th>Итоговая цена, ₽</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentOrder?.tools.map(tool => (
                                <tr key={tool.id}>
                                    <td>{tool.name}</td>
                                    <td>{tool.OrderToolModel?.quantityTools}</td>
                                    <td>{tool.sellPrice}</td>
                                    {/*@ts-ignore*/}
                                    <td>{tool.sellPrice * tool.OrderToolModel?.quantityTools} ₽</td>
                                </tr>
                            )
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}

export default memo(OrderInfo)