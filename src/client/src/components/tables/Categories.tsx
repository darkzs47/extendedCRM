import React, {type FC, memo, useCallback, useEffect, useState} from "react";
import CategoryRow from "./rows/Category.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store/store.ts";
import {createCategory, getAllCategories} from "../../store/categories/actions.ts";
import {Button, Input, InputNumber, Tooltip} from "antd";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import type {ICategory} from "../../models/ICategory.ts";

interface Props {
    isCreateNewCategory: boolean;
    setIsCreateNewCategory: React.Dispatch<React.SetStateAction<boolean>>;
    onCancel: () => void;
}

const Categories: FC<Props> = ({ isCreateNewCategory, setIsCreateNewCategory, onCancel }: Props ) => {
    const dispatch = useDispatch<AppDispatch>()
    const categories: ICategory[] | null = useSelector((state: RootState) => state.categories.categories)
    const [newCategoryName, setNewCategoryName] = useState<string>('')
    const [newCategoryMarkup, setNewCategoryMarkup] = useState<number>(0)

    const handleSubmitNewCategory = useCallback(() => {
        if (newCategoryName === '' || newCategoryMarkup === 0) return

        const request = {
            name: newCategoryName,
            markup: 1 + (newCategoryMarkup / 100),
        }

        dispatch(createCategory(request))

        setNewCategoryMarkup(0)
        setNewCategoryName('')
        setIsCreateNewCategory(!isCreateNewCategory)
    }, [dispatch, newCategoryName, newCategoryMarkup])

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch])

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>Категория</th>
                    <th>Наценка</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {categories?.map(category =>
                    <tr key={category.id}>
                        <CategoryRow category={category}/>
                    </tr>
                )}
                {
                    isCreateNewCategory ? (
                        <tr>
                            <td>
                                <Input
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                value={newCategoryName}
                                style={{ width: "13rem" }}
                                />
                            </td>
                            <td>
                                <InputNumber
                                    type='number'
                                    onChange={(value) => {
                                        if (value !== null) {
                                            setNewCategoryMarkup(value);
                                        }
                                    }}
                                    value={newCategoryMarkup}
                                    style={{ width: '5rem' }}
                                />
                                %
                            </td>
                            <td>
                                <Tooltip title="Сохранить">
                                    <Button
                                        className="checkIcon"
                                        onClick={() => {handleSubmitNewCategory()}}
                                        icon={<CheckOutlined />}
                                        type="text"
                                    />
                                </Tooltip>

                                <Tooltip title="Отменить">
                                    <Button
                                        icon={<CloseOutlined />}
                                        onClick={onCancel}
                                        type="text"
                                    />
                                </Tooltip>
                            </td>
                        </tr>
                    ) : null
                }
                </tbody>
            </table>
        </>
    )
}

export default memo(Categories);