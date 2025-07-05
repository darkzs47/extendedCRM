import {type FC, memo} from "react";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {Button, Tooltip} from "antd";
import type {ICustomer} from "../models/ICustomer.ts";

interface CustomerRowProps {
    customer: ICustomer;
}

const CustomerRow: FC<CustomerRowProps> = ({customer}: CustomerRowProps) => {

    return (
        <>
            <td>{customer.company}</td>
            <td>{customer.email}</td>
            <td>{customer.phone}</td>
            <td>
                <Tooltip title="Редактировать пользователя">
                    <Button
                        icon={<EditOutlined/>}
                        style={{marginRight: 8}}
                        shape="circle"
                    />
                </Tooltip>
                <Tooltip title="Удалить пользователя">
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