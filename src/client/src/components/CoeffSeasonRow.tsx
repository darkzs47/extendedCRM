import {type FC, memo} from "react";
import {Button, Tooltip} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import type {ICoefficientSeason} from "../models/ICoefficientSeason.ts";

export interface CoeffSeasonRowProps {
    coefficient: ICoefficientSeason;
}

const CoeffSeasonRow: FC<CoeffSeasonRowProps> = ({coefficient}: CoeffSeasonRowProps) => {
    return (
        <>
            <td>{coefficient.season}</td>
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

export default memo(CoeffSeasonRow);