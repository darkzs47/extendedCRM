import {type FC, memo, useCallback} from "react";
import {DeleteOutlined, EyeOutlined} from '@ant-design/icons';
import {Button, Tooltip} from "antd";
import type {ICustomer} from "../models/ICustomer.ts";
import {useNavigate} from "react-router-dom";

interface CustomerRowProps {
    customer: ICustomer;
}

const CustomerRow: FC<CustomerRowProps> = ({customer}: CustomerRowProps) => {

    const navigate = useNavigate()

    const handleShowDetails = useCallback((customer: ICustomer) => {
        const id = customer.id;
        navigate(`/customers/:${id}`)
    }, [customer])

    return (
        <>
            <td>{customer.companyName}</td>
            <td>{customer.email}</td>
            <td>{customer.phone}</td>
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
                    />
                </Tooltip>
            </td>
        </>
    )
}

export default memo(CustomerRow);