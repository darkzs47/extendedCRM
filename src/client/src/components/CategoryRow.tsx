import {type FC, memo} from "react";
import {Button, Tooltip} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import type {ICategory} from "../models/ICategory.ts";

interface CategoryRowProps {
    category: ICategory
}

const CategoryRow: FC<CategoryRowProps> = ({category}: CategoryRowProps) => {
    return (
        <>
            <td>{category.name}</td>
            <td>{category.markup}</td>
            <td>
                <Tooltip title="Редактировать категорию">
                    <Button
                        icon={<EditOutlined />}
                        style={{ marginRight: 8 }}
                        shape="circle"
                    />
                </Tooltip>
                <Tooltip title="Удалить категорию">
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

export default memo(CategoryRow);