import {type FC, memo, useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store/store.ts";
import {getAllTools} from "../../store/tools/actions.ts";
import {getAllCustomers} from "../../store/customers/actions.ts";
import type {ICustomer} from "../../models/ICustomer.ts";
import type {ITool} from "../../models/ITool.ts";
import {Button, Form, InputNumber, Select} from "antd";
const {Option} = Select;
import styles from "./addOrder.module.scss"
import useForm from "antd/es/form/hooks/useForm";
import OrderService from "../../services/OrderService.ts";
import {useNavigate} from "react-router-dom";

const AddOrder: FC = () => {
    const navigate = useNavigate()
    const [form] = useForm()
    const dispatch = useDispatch<AppDispatch>()
    const customers: ICustomer[] | null = useSelector((state: RootState) => state.customers.customers)
    const tools: ITool[] | null = useSelector((state: RootState) => state.tools.tools)

    const [selectedTools, setSelectedTools] = useState<Record<number, number>>({});

    const handleQuantityChange = (toolId: number, value: number | null) => {
        setSelectedTools(prev => {
            const updated = { ...prev };

            if (!value || value <= 0) {
                delete updated[toolId];
            } else {
                updated[toolId] = value;
            }

            return updated;
        });
    };
    const totalSum = useMemo(() => {
        return tools?.reduce((acc, tool) => {
            const quantity = selectedTools[tool.id] || 0;
            return acc + tool.sellPrice * quantity;
        }, 0);
    }, [selectedTools, tools]);

    const handleSubmitNewOrder = useCallback(async () => {
        const customerId = form.getFieldValue('customerId')
        const request = {
            tools: Object(selectedTools),
            customerId: customerId,
        }

        await OrderService.createOrder(request)
        navigate('/orders')
    }, [selectedTools])

    useEffect(() => {
        dispatch(getAllTools())
        dispatch(getAllCustomers())
    }, [dispatch]);

    return (
        <main className={styles.orderFormContainer}>
            <h2>Создание заказа</h2>
            <Form
                form={form}
                layout="vertical"
                className={styles.form}
                onFinish={handleSubmitNewOrder}
            >
                <Form.Item
                    className={styles.clientSelect}
                    label="Клиент"
                    name="customerId"
                    rules={[{required: true, message: 'Выберите клиента'}]}
                >
                    <Select
                        placeholder="Выберите клиента"
                    >
                        {customers?.map(customer => (
                            <Option
                                key={customer.id}
                                value={customer.id}
                            >
                                {customer.companyName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <h3>Инструменты</h3>
                <div className={styles.tableContainer}>
                    <table className={styles.orderToolsTable}>
                        <thead>
                        <tr>
                            <td>Инструмент</td>
                            <td>Стоимость за ед. ₽ (с наценкой)</td>
                            <td>Количество</td>
                            <td className={styles.toolTotalSum}>Итого</td>
                        </tr>
                        </thead>
                        <tbody>
                        {tools?.map(tool => (
                            <tr key={tool.id}>
                                <td>{tool.name}</td>
                                <td>{tool.sellPrice}₽</td>
                                <td>
                                    <Form.Item
                                        name={['tools', tool.id, 'quantity']}
                                        style={{marginBottom: '0'}}
                                    >
                                        <InputNumber
                                            className={styles.numberInput}
                                            min={0}
                                            onChange={(value) => handleQuantityChange(tool.id, value)}
                                        />
                                    </Form.Item>
                                </td>
                                <td>
                                    {selectedTools[tool.id]
                                        ? (tool.sellPrice * selectedTools[tool.id]).toFixed(1)
                                        : 0} ₽
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <span>Суммарная стоимость инструментов: {totalSum} ₽</span>
                <Form.Item>
                    <Button
                        className={styles.submitButton}
                        type="primary"
                        htmlType="submit"
                    >
                        Создать
                    </Button>
                </Form.Item>
            </Form>
        </main>
    )
}

export default memo(AddOrder)