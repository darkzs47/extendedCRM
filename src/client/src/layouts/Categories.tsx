import {type FC, memo, useCallback, useEffect, useState} from "react";
import CategoryRow from "../components/CategoryRow.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../store/store.ts";
import {createCategory, getAllCategories} from "../store/categories/actions.ts";
import {Button, Input, InputNumber, Tooltip} from "antd";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";

const Categories: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const categories = useSelector((state: RootState) => state.categories.categories)
    const [isCreateNewCategory, setIsCreateNewCategory] = useState<boolean>(false)
    const [newCategoryName, setNewCategoryName] = useState<string>('')
    const [newCategoryMarkup, setNewCategoryMarkup] = useState<number>(0)

    const handleAddNewCategory = useCallback(() => {
        setIsCreateNewCategory(!isCreateNewCategory);
    }, [isCreateNewCategory])

    const handleCancel = useCallback(() => {
        setIsCreateNewCategory(!isCreateNewCategory)
    }, [isCreateNewCategory])

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
            <div>
                <Button
                    type='primary'
                    onClick={() => handleAddNewCategory()}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ width: '1rem', height: '1rem' }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                    Добавить
                </Button>
            </div>
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
                                />
                            </td>
                            <td>
                                <InputNumber
                                    style={{width: '100px'}}
                                    type='number'
                                    onChange={(value) => {
                                        if (value !== null) {
                                            setNewCategoryMarkup(value);
                                        }
                                    }}
                                    value={newCategoryMarkup}
                                />
                                %
                            </td>
                            <td>
                                <Tooltip title="Сохранить">
                                    <Button
                                        onClick={() => {handleSubmitNewCategory()}}
                                        icon={<CheckOutlined />}
                                        shape="circle"
                                        style={{color: '#2fff00'}}
                                    />
                                </Tooltip>

                                <Tooltip title="Отменить">
                                    <Button
                                        icon={<CloseOutlined />}
                                        onClick={() => {handleCancel()}}
                                        shape="circle"
                                        style={{ marginRight: 8 }}
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