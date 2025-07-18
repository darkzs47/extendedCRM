import {type FC, memo, useCallback, useState} from "react";
import {
    CheckOutlined,
    CloseOutlined,
    DeleteOutlined,
    EditOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';
import {Button, Input, Tooltip} from "antd";
import type {ICustomer} from "../../../models/ICustomer.ts";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../../../store/store.ts";
import {deleteCustomer, updateDiscount} from "../../../store/customers/actions.ts";

interface CustomerRowProps {
    customer: ICustomer;
}

const Customer: FC<CustomerRowProps> = ({customer}: CustomerRowProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const [discountEditing, setDiscountEditing] = useState<boolean>(false)
    const [discount, setDiscount] = useState<string>((customer.discount * 100).toFixed(0));

    const handleShowDetails = useCallback((customer: ICustomer) => {
        const id = customer.id;
        navigate(`/customers/${id}`)
    }, [customer])

    const handleDeleteCustomer = useCallback((customer: ICustomer) => {
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
        const discountForServer = Number(discount) / 100;
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
                                onClick={() => {
                                    handleSaveChanges(customer, discount)
                                }}
                                type="text"
                                icon={<CheckOutlined style={{ color: 'green' }} />}
                            />
                        </Tooltip>

                        <Tooltip title="Отменить">
                            <Button
                                type="text"
                                onClick={() => setDiscountEditing(!discountEditing)}
                                icon={<CloseOutlined/>}
                            />
                        </Tooltip>
                    </td>
                ) : (
                    <td>
                        {discount}%
                        <Tooltip title="Редактировать">
                            <Button
                                type="text"
                                icon={<EditOutlined/>}
                                onClick={() => handleEdit()}
                            />
                        </Tooltip>
                    </td>
                )
            }
            <td>
                <Tooltip title="Подробнее">
                    <Button
                        type="text"
                        icon={<InfoCircleOutlined/>}
                        onClick={() => handleShowDetails(customer)}
                    />
                </Tooltip>
                <Tooltip title="Удалить организацию">
                    <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteCustomer(customer)}
                    />
                </Tooltip>
            </td>
        </>
    )
}

export default memo(Customer);