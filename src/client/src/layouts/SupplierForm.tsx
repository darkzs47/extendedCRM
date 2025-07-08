import {type FC, memo} from "react";
import {Button, Form, Input,} from "antd";
import type {ISupplierFullInfo} from "../models/ISupplierFullInfo.ts";

export type SupplierFormValues = Omit<ISupplierFullInfo, 'id' | 'branches' | 'representatives'>;

interface SupplierFormProps {
    onNext: () => void;
    onChange: (data: SupplierFormValues) => void;
    initialValues?: SupplierFormValues;
}

const SupplierForm: FC<SupplierFormProps> = ({ onNext, onChange, initialValues }) => {
    const [form] = Form.useForm<SupplierFormValues>();

    const handleFinish = (values: SupplierFormValues) => {
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

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Далее
                </Button>
            </Form.Item>
        </Form>
    );
}

export default memo(SupplierForm);