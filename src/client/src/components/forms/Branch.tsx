import {type FC, memo, useCallback} from "react";
import {Button, Checkbox, Form, Input} from "antd"
import type {IAddress} from "../../models/IAddress.ts";
import styles from "../../pages/customers/addCustomer.module.scss"

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

const Branch: FC<BranchFormProps> = ({onNext, onBack, onChange, initialValues}) => {
    const [form] = Form.useForm<BranchFormValues>();

    const onFinish = useCallback((values: BranchFormValues) => {
        onChange(values);
        onNext();
    }, [form]);

    return (
        <>
            <h3>Филиал</h3>
            <Form
                className={styles.form}
                layout="vertical"
                onFinish={onFinish}
                form={form}
                initialValues={initialValues}
                onValuesChange={(_, values) => onChange(values)}
            >
                <Form.Item
                    name="name"
                    label="Название филиала"
                    rules={[{required: true, message: 'Название обязательно для заполнения'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Email обязателен для заполнения' },
                        { type: 'email', message: 'Неверный формат email' }
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
                    name="isMain"
                    valuePropName="checked"
                >
                    <Checkbox
                        checked={false}
                    >
                        Основной филиал
                    </Checkbox>
                </Form.Item>

                <h3>Фактический адрес</h3>

                <Form.Item
                    name={['addressActual', 'country']}
                    label="Страна"
                    rules={[{required: true, message: 'Страна обязательна для заполнения'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name={['addressActual', 'region']}
                    label="Регион"
                    rules={[{required: true, message: 'Регион обязателен для заполнения'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name={['addressActual', 'city']}
                    label="Город"
                    rules={[{required: true, message: 'Город обязателен для заполнения'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name={['addressActual', 'street']}
                    label="Улица"
                    rules={[{required: true, message: 'Улица обязательна для заполнения'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name={['addressActual', 'house']}
                    label="Дом"
                    rules={[{required: true, message: 'Дом обязателен для заполнения'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name={['addressActual', 'building']}
                    label="Строение"
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name={['addressActual', 'postCode']}
                    label="Почтовый индекс"
                    rules={[{required: true, message: 'Почтовый индекс обязателен для заполнения'}]}
                >
                    <Input/>
                </Form.Item>

                <h3>Юридический адрес</h3>

                <Form.Item
                    name={['addressLegal', 'country']}
                    label="Страна"
                    rules={[{required: true, message: 'Страна обязательна для заполнения'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name={['addressLegal', 'region']}
                    label="Регион"
                    rules={[{required: true, message: 'Регион обязателен для заполнения'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name={['addressLegal', 'city']}
                    label="Город"
                    rules={[{required: true, message: 'Город обязателен для заполнения'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name={['addressLegal', 'street']}
                    label="Улица"
                    rules={[{required: true, message: 'Улица обязательна для заполнения'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name={['addressLegal', 'house']}
                    label="Дом"
                    rules={[{required: true, message: 'Дом обязателен для заполнения'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name={['addressLegal', 'building']}
                    label="Строение"
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name={['addressLegal', 'postCode']}
                    label="Почтовый индекс"
                    rules={[{required: true, message: 'Почтовый индекс обязателен для заполнения'}]}
                >
                    <Input/>
                </Form.Item>

                <div className={styles.buttonsContainer}>
                    <Form.Item>
                        <Button
                            onClick={onBack}
                        >
                            Назад
                        </Button>
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

                </div>
            </Form>

        </>
    )
}

export default memo(Branch);