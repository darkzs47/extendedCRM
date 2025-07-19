import {type FC, memo, useCallback, useState} from "react";
import type {ITool} from "../../../models/ITool.ts";
import {Button, Input, Tooltip} from "antd";
import {CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined} from "@ant-design/icons";
import type {AppDispatch, RootState} from "../../../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import type {ICategory} from "../../../models/ICategory.ts";
import {deleteTool, updateTool} from "../../../store/tools/actions.ts";

interface ToolRowProps {
    tool: ITool;
    categoryId: number;
}

const Tool: FC<ToolRowProps> = ({tool}: ToolRowProps) => {
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
        setIsEditing(prev => !prev)
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
            handleEditing()
            if (!result.success) {
                setSellPrice(tool.sellPrice)
                setPurchasePrice(tool.purchasePrice)
            }
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
                                style={{width: '5rem'}}
                            />  ₽
                        </td>
                        <td>
                            <Input
                                type='number'
                                onChange={(e) => setSellPrice(Number(e.target.value))}
                                value={sellPrice}
                                style={{width: '5rem'}}
                            /> ₽
                        </td>
                        <td></td>
                        <td></td>
                        <td>
                            <Tooltip title="Сохранить">
                                <Button
                                    className="checkIcon"
                                    type="text"
                                    icon={<CheckOutlined />}
                                    onClick={() => {
                                        handleSaveChanges(tool)
                                    }}
                                />
                            </Tooltip>
                            <Tooltip title="Отменить">
                                <Button
                                    type='text'
                                    onClick={handleEditing}
                                    icon={<CloseOutlined/>}
                                />
                            </Tooltip>
                        </td>
                    </>
                ) : (
                    <>
                        <td>{tool.name}</td>
                        <td>{categoryName}</td>
                        <td>{tool.purchasePrice} ₽</td>
                        <td>{tool.sellPrice} ₽</td>
                        <td>{
                            tool.isAvailable ? <CheckOutlined className="checkIcon" type='text'/> : <CloseOutlined type='text'/>
                        }</td>
                        <td>{tool.supplier?.companyName ?? '—'} </td>
                        <td>
                            <Tooltip title="Редактировать стоимость инструмента">
                                <Button
                                    type="text"
                                    icon={<EditOutlined/>}
                                    onClick={handleEditing}
                                />
                            </Tooltip>
                            <Tooltip title="Удалить инструмент">
                                <Button
                                    onClick={() => handleDeleteTool(tool)}
                                    icon={<DeleteOutlined/>}
                                    danger
                                    type="text"
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

export default memo(Tool);