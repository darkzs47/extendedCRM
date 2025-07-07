import {type FC, memo} from "react";
import type {ICustomerFullInfo} from "../models/ICustomerFullInfo.ts";
import {Button, Form, Input, InputNumber} from "antd"

export type CustomerFormValues = Omit<ICustomerFullInfo, 'id' | 'branches' | 'representatives'>;

interface CustomerFormProps {
    onNext: () => void;
    onChange: (data: CustomerFormValues) => void;
    initialValues?: CustomerFormValues;
}

const CustomerForm: FC<CustomerFormProps> = ({ onNext, onChange, initialValues }) => {
    const [form] = Form.useForm<CustomerFormValues>();

    const handleFinish = (values: CustomerFormValues) => {
        onChange(values);
        onNext();
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            initialValues={initialValues}
            style={{width: '300px'}}
            onValuesChange={(_, values) => onChange(values)}
        >
            <Form.Item name="companyName" label="Название организации" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name="legalForm" label="Организационно-правовая форма" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name="inn" label="ИНН" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name="kpp" label="КПП" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name="ogrn" label="ОГРН" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                <Input />
            </Form.Item>

            <Form.Item name="phone" label="Телефон" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name="discount" label="Скидка (%)">
                <InputNumber min={0} max={100} step={0.5} />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Далее
                </Button>
            </Form.Item>
        </Form>
    );
}

export default memo(CustomerForm);