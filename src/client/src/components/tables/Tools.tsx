import React, {type FC, memo, useCallback, useEffect, useState} from "react";
import Tool from "./rows/Tool.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store/store.ts";
import {getAllCategories} from "../../store/categories/actions.ts";
import {createTool, getAllTools} from "../../store/tools/actions.ts";
import {Button, Input, Select, Tooltip} from "antd";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import styles from "../../pages/tools/tools.module.scss"
import type {ICategory} from "../../models/ICategory.ts";
import type {ITool} from "../../models/ITool.ts";
import type {UserRole} from "../../../../server/core/models/User/User.ts";
import ToolForSupplier from "./rows/ToolForSupplier.tsx";

interface Props {
    isCreateNewTool: boolean,
    setIsCreateNewTool: React.Dispatch<React.SetStateAction<boolean>>,
    onCancel: () => void,
}

const Tools: FC<Props> = ({isCreateNewTool, setIsCreateNewTool, onCancel}: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const categories: ICategory[] | null = useSelector((state: RootState) => state.categories.categories)
    const tools: ITool[] | null = useSelector((state: RootState) => state.tools.tools)
    const currentUserRole: UserRole | undefined = useSelector((state: RootState) => state.currentUser.currentUser?.role)

    const [newToolName, setNewToolName] = useState<string>('')
    const [newToolPurchasePrice, setNewToolPurchasePrice] = useState<number>(0)
    const [newToolSellPrice, setNewToolSellPrice] = useState<number>(0)
    const [newToolCategoryId, setNewToolCategoryId] = useState<number>(1);
    const handleSubmitNewTool = useCallback(() => {
        if (newToolName === '' || newToolPurchasePrice === 0) return

        const request = {
            name: newToolName,
            sellPrice: newToolSellPrice,
            categoryId: newToolCategoryId,
            purchasePrice: newToolPurchasePrice,
        }

        dispatch(createTool(request))

        setNewToolName('')
        setNewToolPurchasePrice(0)
        setNewToolSellPrice(0)
        setNewToolCategoryId(1)
        setIsCreateNewTool(!isCreateNewTool)
    }, [newToolName, newToolPurchasePrice, newToolCategoryId, newToolSellPrice, dispatch])

    const calculatePrice = useCallback((priceValue: number) => {
        setNewToolPurchasePrice(priceValue)
        const currentCategoryMarkup: number = categories?.find(category => category.id === newToolCategoryId)?.markup ?? 1
        const sellPrice: number = parseFloat((priceValue * currentCategoryMarkup).toFixed(1))
        setNewToolSellPrice(sellPrice)
    }, [newToolPurchasePrice])

    useEffect(() => {
        dispatch(getAllCategories());
        dispatch(getAllTools())
    }, [dispatch])

    return (
        <div className={styles.toolsMainContainer}>
            <table>
                <thead>
                <tr>
                    <th>Название</th>
                    <th>Категория</th>
                    {currentUserRole !== 'supplier' && <th>Стоимость покупки</th>}
                    <th>Стоимость продажи</th>
                    <th>Наличие</th>
                    {currentUserRole !== 'supplier' && <th>Поставщик</th>}
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {tools?.map(tool => (
                    <tr key={tool.id}>
                        {currentUserRole === 'supplier'
                            ? <ToolForSupplier key={tool.id} tool={tool} categoryId={tool.categoryId}/>
                            : <Tool key={tool.id} tool={tool} categoryId={tool.categoryId}/>}
                    </tr>
                ))}

                {isCreateNewTool && currentUserRole !== 'supplier' && (
                    <tr>
                        <td>
                            <Input
                                onChange={(e) => setNewToolName(e.target.value)}
                                value={newToolName}
                                style={{ width: '5rem' }}
                            />
                        </td>
                        <td>
                            <Select
                                value={newToolCategoryId}
                                onChange={setNewToolCategoryId}
                                placeholder="Выберите категорию"
                            >
                                {categories?.map((category) => (
                                    <Select.Option key={category.id} value={category.id}>
                                        {category.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </td>
                        <td>
                            <Input
                                type='number'
                                onChange={(e) => calculatePrice(Number(e.target.value))}
                                value={newToolPurchasePrice}
                                style={{ width: '5rem' }}
                            />
                        </td>
                        <td>{newToolSellPrice}</td>
                        <td>—</td>
                        <td>—</td>
                        <td>
                            <Tooltip title="Сохранить">
                                <Button
                                    className="checkIcon"
                                    onClick={handleSubmitNewTool}
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
                )}
                {isCreateNewTool && currentUserRole === 'supplier' && (
                    <tr>
                        <td>
                            <Input
                                onChange={(e) => setNewToolName(e.target.value)}
                                value={newToolName}
                                style={{ width: '5rem' }}
                            />
                        </td>
                        <td>
                            <Select
                                value={newToolCategoryId}
                                onChange={setNewToolCategoryId}
                                placeholder="Выберите категорию"
                            >
                                {categories?.map((category) => (
                                    <Select.Option key={category.id} value={category.id}>
                                        {category.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </td>
                        <td>
                            <Input
                                type='number'
                                onChange={(e) => calculatePrice(Number(e.target.value))}
                                value={newToolPurchasePrice}
                                style={{ width: '5rem' }}
                            />
                        </td>
                        <td><CheckOutlined className="checkIcon" type='text'/></td>
                        <td>
                            <Tooltip title="Сохранить">
                                <Button
                                    className="checkIcon"
                                    onClick={handleSubmitNewTool}
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
                )}
                </tbody>
            </table>
        </div>
    )
}

export default memo(Tools);