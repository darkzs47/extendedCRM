import {type FC, memo, useCallback, useEffect, useState} from "react";
import ToolRow from "../components/ToolRow.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../store/store.ts";
import {getAllCategories} from "../store/categories/actions.ts";
import {createTool, getAllTools} from "../store/tools/actions.ts";
import {Button, Input, Select, Tooltip} from "antd";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";

const ToolsTable: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const categories = useSelector((state: RootState) => state.categories.categories)
    const tools = useSelector((state: RootState) => state.tools.tools)

    const [isCreateNewTool, setIsCreateNewTool] = useState<boolean>(false)
    const [newToolName, setNewToolName] = useState<string>('')

    const [newToolPurchasePrice, setNewToolPurchasePrice] = useState<number>(0)
    const [newToolSellPrice, setNewToolSellPrice] = useState<number>(0)
    const [newToolCategoryId, setNewToolCategoryId] = useState<number>(1);
    console.log(newToolCategoryId)

    const handleAddNewTool = () => {
        setIsCreateNewTool(!isCreateNewTool);
    }

    const handleCancel = useCallback(() => {
        setIsCreateNewTool(!isCreateNewTool)
    }, [isCreateNewTool])

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

    useEffect(() => {
        dispatch(getAllCategories());
        dispatch(getAllTools())
    }, [dispatch])

    return (
        <>
            <div>
                <Button
                    type='primary'
                    onClick={() => handleAddNewTool()}
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
                        <ToolRow tool={tool}/>
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
                                <Select value={newToolCategoryId} onChange={setNewToolCategoryId}>
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
                                    onChange={(e) => setNewToolSellPrice(Number(e.target.value))}
                                    value={newToolSellPrice}
                                />
                            </td>
                            <td>
                                <Input
                                    type='number'
                                    onChange={(e) => setNewToolPurchasePrice(Number(e.target.value))}
                                    value={newToolPurchasePrice}
                                />
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

export default memo(ToolsTable);