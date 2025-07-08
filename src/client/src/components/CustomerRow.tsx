import {type FC, memo, useCallback} from "react";
import {DeleteOutlined, EyeOutlined} from '@ant-design/icons';
import {Button, Tooltip} from "antd";
import type {ICustomer} from "../models/ICustomer.ts";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../store/store.ts";
import {deleteCustomer} from "../store/customers/actions.ts";

interface CustomerRowProps {
    customer: ICustomer;
}

const CustomerRow: FC<CustomerRowProps> = ({customer}: CustomerRowProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const handleShowDetails = useCallback((customer: ICustomer) => {
        const id = customer.id;
        navigate(`/customers/${id}`)
    }, [customer])

    const handleDeleteCustomer = useCallback((customer: ICustomer)=> {
        const confirmString = `Вы действительно хотите удалить всю информацию об организации ${customer.companyName}`;
        if (confirm(confirmString)) dispatch(deleteCustomer({id: customer.id}))
    }, [customer])

    return (
        <>
            <td>{customer.companyName}</td>
            <td>{customer.email}</td>
            <td>{customer.phone}</td>
            <td>{customer.discount}</td>
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