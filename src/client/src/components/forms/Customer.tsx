import {type FC, memo, useCallback} from "react";
import type {ICustomerFullInfo} from "../../models/ICustomerFullInfo.ts";
import {Button, Form, Input, InputNumber} from "antd"
import styles from "../../pages/customers/addCustomer.module.scss"

export type CustomerFormValues = Omit<ICustomerFullInfo, 'id' | 'branches' | 'representatives'>;

interface CustomerFormProps {
    onNext: () => void;
    onChange: (data: CustomerFormValues) => void;
    initialValues?: CustomerFormValues;
}

const Customer: FC<CustomerFormProps> = ({onNext, onChange, initialValues}) => {
    const [form] = Form.useForm<CustomerFormValues>();

    const handleFinish = useCallback((values: CustomerFormValues) => {
        onChange(values);
        onNext();
    }, [form]);

    return (
        <>
            <h3>Общая информация</h3>
            <Form
                className={styles.form}
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                initialValues={initialValues}
                onValuesChange={(_, values) => onChange(values)}
            >
                <Form.Item
                    name="companyName"
                    label="Название организации"
                    rules={[{required: true, message: 'Название организации обязательно для заполнения'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="legalForm"
                    label="Организационно-правовая форма"
                    rules={[{required: true, message: 'Организационно-правовая форма обязательна для заполнения'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="inn"
                    label="ИНН"
                    rules={[{required: true, message: 'ИНН обязателен для заполнения'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="kpp"
                    label="КПП"
                    rules={[{required: true, message: 'КПП обязателен для заполнения'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="ogrn"
                    label="ОГРН"
                    rules={[{required: true, message: 'ОГРН обязателен для заполнения'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {required: true, message: 'Email обязателен для заполнения'},
                        {type: 'email', message: 'Неверный формат email' }
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Телефон"
                    rules={[{required: true, message: 'Телефон обязателен для заполнения'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="discount"
                    label="Скидка (%)"
                >
                    <InputNumber
                        className={styles.numberInput}
                        value={0}
                        min={0}
                        max={100}
                        step={0.5}
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        className={styles.submitButton}
                        type="primary"
                        htmlType="submit"
                    >
                        Далее
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default memo(Customer);