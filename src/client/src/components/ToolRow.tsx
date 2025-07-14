import {type FC, memo, useCallback, useState} from "react";
import type {ITool} from "../models/ITool.ts";
import {Button, Input, Tooltip} from "antd";
import {CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined} from "@ant-design/icons";
import type {AppDispatch, RootState} from "../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import type {ICategory} from "../models/ICategory.ts";
import {deleteTool, updateTool} from "../store/tools/actions.ts";

interface ToolRowProps {
    tool: ITool;
    categoryId: number;
}

const ToolRow: FC<ToolRowProps> = ({tool}: ToolRowProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const categories: ICategory[] | null = useSelector((state: RootState) => state.categories.categories)

    const categoryName: string | undefined =
        tool.category?.name
        ?? categories?.find(category => category.id === tool.categoryId)?.name

    const categoryMarkup: number | undefined =
        tool.category?.markup
        ?? categories?.find(category => category.id === tool.categoryId)?.markup

    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [sellPrice, setSellPrice] = useState<number>(tool.sellPrice)
    const [purchasePrice, setPurchasePrice] = useState<number | undefined>(tool.purchasePrice)

    const handleEditing = useCallback(() => {
        setIsEditing(!isEditing)
    }, [isEditing])

    const handleSaveChanges = useCallback(async (tool: ITool) => {
        if (purchasePrice === undefined || categoryMarkup === undefined) return
        const confirmString = `Вы действительно хотите изменить стоимость ${tool.name}`;
        let fixedSellPrice: number = sellPrice
        if (purchasePrice > sellPrice)
            fixedSellPrice = parseFloat((purchasePrice * categoryMarkup).toFixed(1))
            setSellPrice(fixedSellPrice)
        if (confirm(confirmString)) {
            const updatedData = {
                id: tool.id,
                sellPrice: fixedSellPrice,
                purchasePrice,
            };
            const result = await dispatch(updateTool(updatedData))
            if (!result.success) {
                setSellPrice(tool.sellPrice)
                setPurchasePrice(tool.purchasePrice)
            }
            handleEditing()
        }
    }, [dispatch, sellPrice, purchasePrice])

    const handleDeleteTool = useCallback((tool: ITool) => {
        const confirmString = `Вы действительно хотите удалить инструмент ${tool.name}`;
        if (confirm(confirmString)) dispatch(deleteTool({id: tool.id}))
    }, [dispatch, tool])

    return (
        <>
            {
                isEditing ? (
                    <>
                        <td>{tool.name}</td>
                        <td>{categoryName}</td>
                        <td>
                            <Input
                                type='number'
                                onChange={(e) => setPurchasePrice(Number(e.target.value))}
                                value={purchasePrice}
                            />
                        </td>
                        <td>
                            <Input
                                type='number'
                                onChange={(e) => setSellPrice(Number(e.target.value))}
                                value={sellPrice}
                            />
                        </td>
                        <td>
                            <Tooltip title="Сохранить">
                                <Button
                                    onClick={() => {
                                        handleSaveChanges(tool)
                                    }}
                                    icon={<CheckOutlined/>}
                                    shape="circle"
                                    style={{color: '#2fff00'}}
                                />
                            </Tooltip>
                            <Tooltip title="Отменить">
                                <Button
                                    onClick={() => handleEditing()}
                                    icon={<CloseOutlined/>}
                                    style={{marginRight: 8}}
                                    shape="circle"
                                />
                            </Tooltip>
                        </td>
                    </>
                ) : (
                    <>
                        <td>{tool.name}</td>
                        <td>{categoryName}</td>
                        <td>{tool.purchasePrice}</td>
                        <td>{tool.sellPrice}</td>
                        <td>
                            <Tooltip title="Редактировать стоимость инструмента">
                                <Button
                                    onClick={() => handleEditing()}
                                    icon={<EditOutlined/>}
                                    style={{marginRight: 8}}
                                    shape="circle"
                                />
                            </Tooltip>
                            <Tooltip title="Удалить инструмент">
                                <Button
                                    onClick={() => handleDeleteTool(tool)}
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
        </>
    )
}

export default memo(ToolRow);