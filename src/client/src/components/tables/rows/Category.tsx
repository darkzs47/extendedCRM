import {type FC, memo, useCallback, useState} from "react";
import {Button, Input, Tooltip} from "antd";
import {
    CheckOutlined,
    CloseOutlined,
    DeleteOutlined,
    EditOutlined
} from "@ant-design/icons";
import type {ICategory} from "../../../models/ICategory.ts";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../../../store/store.ts";
import {deleteCategory, updateMarkupCategory} from "../../../store/categories/actions.ts";

interface CategoryRowProps {
    category: ICategory
}

const Category: FC<CategoryRowProps> = ({category}: CategoryRowProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const [isEditing, setIsEditing] = useState<boolean>(false)

    const [markup, setMarkup] = useState<number>(parseFloat(((category.markup - 1) * 100).toFixed(0)))

    const handleEditing = useCallback(() => {
        setIsEditing(!isEditing)
    }, [isEditing])

    const handleSaveChanges = useCallback((category: ICategory) => {
        if (markup === 0) return
        const request = {
            id: category.id,
            markup: 1 + (markup / 100),
        }
        dispatch(updateMarkupCategory(request))
        setIsEditing(!isEditing)
    }, [dispatch, markup, category])

    const handleDeleteCategory = useCallback((category: ICategory)=> {
        const confirmString = `Вы действительно хотите удалить категорию ${category.name}`;
        if (confirm(confirmString)) dispatch(deleteCategory({id: category.id}))
    }, [dispatch, category])

    return (
        <>
            <td>
                {category.name}
            </td>
            {
                isEditing ? (
                        <>
                            <td>
                                <Input
                                    type='number'
                                    onChange={(e) => setMarkup(Number(e.target.value))}
                                    value={markup}
                                />
                            </td>
                            <td>
                                <Tooltip title="Сохранить">
                                    <Button
                                        type="text"
                                        icon={<CheckOutlined style={{ color: 'green' }} />}
                                        onClick={() => handleSaveChanges(category)}
                                    />
                                </Tooltip>

                                <Tooltip title="Отменить">
                                    <Button
                                        type="text"
                                        icon={<CloseOutlined/>}
                                        onClick={() => handleEditing()}
                                    />
                                </Tooltip>
                            </td>
                        </>
                    ) :
                    (
                        <>
                            <td>{markup}%</td>
                            <td>
                                <Tooltip title="Редактировать категорию">
                                    <Button
                                        type="text"
                                        icon={<EditOutlined/>}
                                        onClick={() => handleEditing()}
                                    />
                                </Tooltip>
                                <Tooltip title="Удалить категорию">
                                    <Button
                                        type="text"
                                        danger
                                        icon={<DeleteOutlined />}
                                        onClick={() => handleDeleteCategory(category)}
                                    />
                                </Tooltip>
                            </td>
                        </>
                    )
            }
        </>
    )
}

export default memo(Category);