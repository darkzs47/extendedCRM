import {type FC, memo} from "react";
import type {ITool} from "../models/ITool.ts";
import {Button, Tooltip} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

interface ToolRowProps {
    tool: ITool;
}

const ToolRow: FC<ToolRowProps> = ({tool}: ToolRowProps) => {

    return (
        <>
            <td>{tool.name}</td>
            <td>{tool.category?.name}</td>
            <td>{tool.sellPrice}</td>
            <td>{tool.purchasePrice}</td>
            <td>
                <Tooltip title="Редактировать инструмент">
                    <Button
                        icon={<EditOutlined />}
                        style={{ marginRight: 8 }}
                        shape="circle"
                    />
                </Tooltip>
                <Tooltip title="Удалить инструмент">
                    <Button
                        icon={<DeleteOutlined />}
                        danger
                        type="default"
                        shape="circle"
                    />
                </Tooltip>
            </td>
        </>
    )
}

export default memo(ToolRow);