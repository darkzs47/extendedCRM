import {type FC, memo, useCallback} from "react";
import type {IRepresentative} from "../../models/IRepresentative.ts";
import {Button, Checkbox, Form, Input} from "antd";
import styles from "../../pages/customers/addCustomer.module.scss"

export type RepresentativeFormValues = Omit<IRepresentative, 'id' | 'customer' | 'customerId'>;

interface RepresentativeFormProps {
    onBack: () => void;
    onSubmit: () => void;
    onChange: (data: RepresentativeFormValues) => void;
    initialValues?: RepresentativeFormValues;
}

const Representative: FC<RepresentativeFormProps> = ({onBack, onSubmit, onChange, initialValues}) => {
    const [form] = Form.useForm<RepresentativeFormValues>();

    const handleFinish = useCallback((values: RepresentativeFormValues) => {
        onChange(values);
        onSubmit();
    }, [form]);

    return (
        <>
            <h3>Представитель</h3>
            <Form
                className={styles.form}
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                initialValues={initialValues}
                onValuesChange={(_, values) => onChange(values)}
            >
                <Form.Item
                    name="secondName"
                    label="Фамилия"
                    rules={[{required: true, message: 'Фамилия обязательна для заполнения'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="name"
                    label="Имя"
                    rules={[{required: true, message: 'Имя обязательно для заполнения'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="lastName"
                    label="Отчество"
                    rules={[{required: true, message: 'Фамилия обязательна для заполнения'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="representativePosition"
                    label="Должность"
                    rules={[{required: true, message: 'Должность обязательна для заполнения'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {required: true, message: 'Email обязателен для заполнения'},
                        {type: 'email', message: 'Неверный формат email'}
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
                        Основной представитель
                    </Checkbox>
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
                            Добавить
                        </Button>
                    </Form.Item>
                </div>

            </Form>
        </>
    );
};

export default memo(Representative);