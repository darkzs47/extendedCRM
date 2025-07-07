import {type FC, memo} from "react";
import {Button, Checkbox, Form, Input} from "antd"
import type {IAddress} from "../models/IAddress.ts";

export type BranchFormValues = {
    name: string;
    phone: string;
    email: string;
    isMain: boolean;
    addressActual: Omit<IAddress, "id">;
    addressLegal: Omit<IAddress, "id">;
};

interface BranchFormProps {
    onNext: () => void;
    onBack: () => void;
    onChange: (data: BranchFormValues) => void;
    initialValues: BranchFormValues;
}

const BranchForm: FC<BranchFormProps> = ({ onNext, onBack, onChange, initialValues }) => {
    const [form] = Form.useForm<BranchFormValues>();

    const onFinish = (values: BranchFormValues) => {
        onChange(values);
        onNext();
    };

    return (
        <Form
            layout="vertical"
            onFinish={onFinish}
            form={form}
            style={{width: '300px'}}
            initialValues={initialValues}
            onValuesChange={(_, values) => onChange(values)}
        >
            <Form.Item name="name" label="Название филиала" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                <Input />
            </Form.Item>

            <Form.Item name="phone" label="Телефон" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name="isMain" valuePropName="checked">
                <Checkbox checked={false}>Основной филиал</Checkbox>
            </Form.Item>

            <h3>Фактический адрес</h3>
            <Form.Item name={['addressActual', 'country']} label="Страна" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['addressActual', 'region']} label="Регион" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['addressActual', 'city']} label="Город" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['addressActual', 'street']} label="Улица" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['addressActual', 'house']} label="Дом" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['addressActual', 'building']} label="Строение">
                <Input />
            </Form.Item>
            <Form.Item name={['addressActual', 'postCode']} label="Почтовый индекс" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <h3>Юридический адрес</h3>
            <Form.Item name={['addressLegal', 'country']} label="Страна" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['addressLegal', 'region']} label="Регион" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['addressLegal', 'city']} label="Город" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['addressLegal', 'street']} label="Улица" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['addressLegal', 'house']} label="Дом" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['addressLegal', 'building']} label="Строение">
                <Input />
            </Form.Item>
            <Form.Item name={['addressLegal', 'postCode']} label="Почтовый индекс" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Далее
                </Button>
            </Form.Item>

            <Form.Item>
                <Button onClick={onBack}>Назад</Button>
            </Form.Item>
        </Form>
    )
}

export default memo(BranchForm);