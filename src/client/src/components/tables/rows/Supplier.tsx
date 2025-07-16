import {type FC, memo, useCallback} from "react";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../../../store/store.ts";
import {useNavigate} from "react-router-dom";
import {Button, Tooltip} from "antd";
import {DeleteOutlined, EyeOutlined} from "@ant-design/icons";
import type {ISupplier} from "../../../models/ISupplier.ts";
import { deleteSupplier } from "../../../store/suppliers/actions.ts";

interface SupplierRowProps {
    supplier: ISupplier;
}

const Supplier: FC<SupplierRowProps> = ({supplier}: SupplierRowProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const handleShowDetails = useCallback((supplier: ISupplier) => {
        const id = supplier.id;
        navigate(`/suppliers/${id}`)
    }, [supplier])

    const handleDeleteSupplier = useCallback((supplier: ISupplier)=> {
        const confirmString = `Вы действительно хотите удалить всю информацию об организации ${supplier.companyName}`;
        if (confirm(confirmString)) dispatch(deleteSupplier({id: supplier.id}))
    }, [supplier])

    return (
        <>
            <td>{supplier.companyName}</td>
            <td>{supplier.email}</td>
            <td>{supplier.phone}</td>
            <td>
                <Tooltip title="Подробнее">
                    <Button
                        icon={<EyeOutlined />}
                        type="default"
                        onClick={() => handleShowDetails(supplier)}
                    />
                </Tooltip>
                <Tooltip title="Удалить организацию">
                    <Button
                        icon={<DeleteOutlined/>}
                        danger
                        type="default"
                        shape="circle"
                        onClick={() => handleDeleteSupplier(supplier)}
                    />
                </Tooltip>
            </td>
        </>
    )
}

export default memo(Supplier);