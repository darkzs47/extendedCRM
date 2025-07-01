import {memo, type FC} from 'react'
import {Button, Form, Input} from "antd";
import axios from "axios";

const Login: FC = () => {
    const [form] = Form.useForm();

    const onFinish = async (values: string): Promise<void> => {
        try {
            await axios.post("http://localhost:5252/auth/login", values);
            form.resetFields();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main>
            <Form
                form={form}
                name="userForm"
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Введите email" },
                        { type: "email", message: "Некорректный email" },
                    ]}
                >
                    <Input placeholder="ivanov@example.com" />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: "Введите пароль" }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </main>
    )
}

export default memo(Login);