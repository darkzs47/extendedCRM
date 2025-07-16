import React, {type FC, memo, useCallback, useEffect, useState} from "react";
import ToolRow from "../components/ToolRow.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../store/store.ts";
import {getAllCategories} from "../store/categories/actions.ts";
import {createTool, getAllTools} from "../store/tools/actions.ts";
import {Button, Input, Select, Tooltip} from "antd";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import styles from "../styles/toolsMain.module.scss"

interface Props {
    isCreateNewTool: boolean,
    setIsCreateNewTool: React.Dispatch<React.SetStateAction<boolean>>,
    onCancel: () => void,
}

const ToolsTable: FC<Props> = ({ isCreateNewTool, setIsCreateNewTool, onCancel }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const categories = useSelector((state: RootState) => state.categories.categories)
    const tools = useSelector((state: RootState) => state.tools.tools)

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
                    <th>Стоимость покупки</th>
                    <th>Стоимость продажи</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {tools?.map(tool =>
                    <tr key={tool.id}>
                        <ToolRow tool={tool} categoryId={tool.categoryId}/>
                    </tr>
                )}
                {
                    isCreateNewTool ? (
                        <tr>
                            <td>
                                <Input
                                    onChange={(e) => setNewToolName(e.target.value)}
                                    value={newToolName}
                                />
                            </td>
                            <td>
                                <Select value={newToolCategoryId} onChange={setNewToolCategoryId} placeholder="Выберите категорию">
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
                                />
                            </td>
                            <td>
                                {newToolSellPrice}
                            </td>
                            <td>
                                <Tooltip title="Сохранить">
                                    <Button
                                        onClick={() => {handleSubmitNewTool()}}
                                        icon={<CheckOutlined />}
                                        shape="circle"
                                        style={{color: '#2fff00'}}
                                    />
                                </Tooltip>

                                <Tooltip title="Отменить">
                                    <Button
                                        icon={<CloseOutlined />}
                                        onClick={onCancel}
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
        </div>
    )
}

export default memo(ToolsTable);