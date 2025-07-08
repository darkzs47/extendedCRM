import {type FC, memo, useCallback, useState} from "react";
import {CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined, EyeOutlined} from '@ant-design/icons';
import {Button, Input, Tooltip} from "antd";
import type {ICustomer} from "../models/ICustomer.ts";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../store/store.ts";
import {deleteCustomer, updateDiscount} from "../store/customers/actions.ts";

interface CustomerRowProps {
    customer: ICustomer;
}

const CustomerRow: FC<CustomerRowProps> = ({customer}: CustomerRowProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const [discountEditing, setDiscountEditing] = useState<boolean>(false)
    const [discount, setDiscount] = useState<string>(((1 - customer.discount) * (-100)).toFixed(0))

    const handleShowDetails = useCallback((customer: ICustomer) => {
        const id = customer.id;
        navigate(`/customers/${id}`)
    }, [customer])

    const handleDeleteCustomer = useCallback((customer: ICustomer)=> {
        const confirmString = `Вы действительно хотите удалить всю информацию об организации ${customer.companyName}`;
        if (confirm(confirmString)) dispatch(deleteCustomer({id: customer.id}))
    }, [customer])

    const handleEdit = useCallback(() => {
        setDiscountEditing(!discountEditing)
    }, [discountEditing, discount])

    const handleSaveChanges = useCallback((customer: ICustomer, discount: string) => {
        setDiscountEditing(!discountEditing)
        setDiscount(String(discount))
        if (Number(discount) < 0 || Number(discount) > 100) {
            console.error("Некорректные данные");
            return
        }
        const discountForServer = (Number(discount) + 1) / 100;
        const request = {id: customer.id, discount: discountForServer}
        dispatch(updateDiscount(request))
    }, [discountEditing, discount])

    return (
        <>
            <td>{customer.companyName}</td>
            <td>{customer.email}</td>
            <td>{customer.phone}</td>
            {
                discountEditing ? (
                    <td>
                        <Input
                            type='number'
                            style={{width: '75px'}}
                            onChange={(e) => setDiscount(e.target.value)}
                            value={discount}
                        />%
                        <Tooltip title="Сохранить">
                            <Button
                                onClick={() => {handleSaveChanges(customer, discount)}}
                                icon={<CheckOutlined />}
                                shape="circle"
                                style={{color: '#2fff00'}}
                            />
                        </Tooltip>

                        <Tooltip title="Отменить">
                            <Button
                                icon={<CloseOutlined />}
                                onClick={() => setDiscountEditing(!discountEditing)}
                                shape="circle"
                                style={{ marginRight: 8 }}
                            />
                        </Tooltip>
                    </td>
                ) : (
                    <td>
                        {discount}%
                        <Tooltip title="Редактировать">
                            <Button
                                type="text"
                                icon={<EditOutlined />}
                                onClick={() => handleEdit()}
                            />
                        </Tooltip>
                    </td>
                )
            }
            <td>
                <Tooltip title="Подробнее">
                    <Button
                        icon={<EyeOutlined />}
                        type="default"
                        onClick={() => handleShowDetails(customer)}
                    />
                </Tooltip>
                <Tooltip title="Удалить организацию">
                    <Button
                        icon={<DeleteOutlined/>}
                        danger
                        type="default"
                        shape="circle"
                        onClick={() => handleDeleteCustomer(customer)}
                    />
                </Tooltip>
            </td>
        </>
    )
}

export default memo(CustomerRow);