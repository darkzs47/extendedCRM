import {type FC, memo} from "react";
import type { IRepresentative } from "../models/IRepresentative";
import {Button, Checkbox, Form, Input} from "antd";

export type RepresentativeFormValues = Omit<IRepresentative, 'id' | 'customer' | 'customerId'>;

interface RepresentativeFormProps {
    onBack: () => void;
    onSubmit: () => void;
    onChange: (data: RepresentativeFormValues) => void;
    initialValues?: RepresentativeFormValues;
}

const RepresentativeForm: FC<RepresentativeFormProps> = ({ onBack, onSubmit, onChange, initialValues}) => {
    const [form] = Form.useForm<RepresentativeFormValues>();

    const handleFinish = (values: RepresentativeFormValues) => {
        onChange(values);
        onSubmit();
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            initialValues={initialValues}
            style={{ width: "300px" }}
            onValuesChange={(_, values) => onChange(values)}
        >
            <Form.Item name="secondName" label="Фамилия" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name="name" label="Имя" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name="lastName" label="Отчество" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name="position" label="Должность" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
                <Input />
            </Form.Item>

            <Form.Item name="phone" label="Телефон" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name="isMain" valuePropName="checked">
                <Checkbox checked={false}>Основной представитель</Checkbox>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Добавить
                </Button>
            </Form.Item>

            <Form.Item>
                <Button onClick={onBack}>Назад</Button>
            </Form.Item>

        </Form>
    );
};

export default memo(RepresentativeForm);