import {type FC, memo, useCallback} from "react";
import {Button, Form, Input,} from "antd";
import type {ISupplierFullInfo} from "../../models/ISupplierFullInfo.ts";
import styles from "../../pages/suppliers/addSupplier.module.scss";

export type SupplierFormValues = Omit<ISupplierFullInfo, 'id' | 'branches' | 'representatives'>;

interface SupplierFormProps {
    onNext: () => void;
    onChange: (data: SupplierFormValues) => void;
    initialValues?: SupplierFormValues;
}

const Supplier: FC<SupplierFormProps> = ({onNext, onChange, initialValues}) => {
    const [form] = Form.useForm<SupplierFormValues>();

    const handleFinish = useCallback((values: SupplierFormValues) => {
        onChange(values);
        onNext();
    }, []);

    return (
        <>
            <h3>Общая информация</h3>
            <Form className={styles.form}
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

export default memo(Supplier);