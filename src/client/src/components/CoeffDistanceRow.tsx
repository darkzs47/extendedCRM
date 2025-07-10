import {type FC, memo} from "react";
import {Button, Tooltip} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import type {ICoefficientDistance} from "../models/ICoefficientDistance.ts";

export interface CoeffDistanceRowProps {
    coefficient: ICoefficientDistance;
}

const CoeffDistanceRow: FC<CoeffDistanceRowProps> = ({coefficient}: CoeffDistanceRowProps) => {
    return (
        <>
            <td>{coefficient.maxKm}</td>
            <td>{coefficient.maxKm}</td>
            <td>{coefficient.coefficient}</td>
            <td>
                <Tooltip title="Редактировать коэффициент">
                    <Button
                        icon={<EditOutlined/>}
                        style={{marginRight: 8}}
                        shape="circle"
                    />
                </Tooltip>
                <Tooltip title="Удалить коэффициент">
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

export default memo(CoeffDistanceRow);