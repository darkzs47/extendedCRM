import {type FC, memo, useCallback, useState} from "react";
import type {IOrder} from "../../../models/IOrder.ts";
import dayjs from "dayjs";
import {CheckOutlined, CloseOutlined, DeleteOutlined, InfoCircleOutlined} from "@ant-design/icons";
import {Button, Tooltip } from "antd";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../../../store/store.ts";
import type {OrderStatus} from "../../../types/orderStatus.ts";
import {deleteOrder, updateStatusOrder} from "../../../store/orders/actions.ts";
import {useNavigate} from "react-router-dom";

interface OrderProps {
    customer: string | undefined;
    order: IOrder;
}

const Order: FC<OrderProps> = ({order, customer}: OrderProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const [completedStatus, setCompletedStatus] = useState<boolean>(order.status === "Завершён")
    const navigate = useNavigate()

    const handleChangeOrderStatus = useCallback((order: IOrder, status: OrderStatus) => {
        const request = {
            id: order.id,
            status: status,
        }
        setCompletedStatus(true)
        dispatch(updateStatusOrder(request))
    }, [order, dispatch])

    const handleDelete = useCallback((order: IOrder) => {
        dispatch(deleteOrder({id: order.id}))
    }, [order])
    const handleShowDetails = useCallback((order: IOrder) => {
        const id = order.id;
        navigate(`/orders/${id}`)
    }, [order]);
    return (
        <>
            <td>{customer}</td>
            <td>{dayjs(order.createdAt).format('DD.MM.YYYY')}</td>
            <td>{order.completedAt ? dayjs(order.completedAt).format('DD.MM.YYYY') : "Не завершён"}</td>
            <td>{order.status}</td>
            <td>{order.finalPrice} ₽</td>
            <td>
                <Tooltip title="Завершить заказ">
                    <Button
                        className="checkIcon"
                        type="text"
                        icon={<CheckOutlined/>}
                        onClick={() => handleChangeOrderStatus(order, "Завершён")}
                        disabled={completedStatus}
                    />
                </Tooltip>

                <Tooltip title="Подробнее о заказе">
                    <Button
                        type="text"
                        icon={<InfoCircleOutlined />}
                        onClick={() => handleShowDetails(order)}
                    />
                </Tooltip>

                <Tooltip title="Отменить заказ">
                    <Button
                        type="text"
                        icon={<CloseOutlined />}
                        onClick={() => handleChangeOrderStatus(order, "Отменён")}
                        disabled={completedStatus}
                    />
                </Tooltip>

                <Tooltip title="Удалить заказ">
                    <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => {handleDelete(order)}}
                    />
                </Tooltip>
            </td>
        </>
    )
}

export default memo(Order)