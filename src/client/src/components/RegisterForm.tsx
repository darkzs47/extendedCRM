import {type FC, memo, type MouseEventHandler, useCallback} from 'react'
import {Button, Form, Input} from "antd";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../store/store.ts";
import {registration} from "../store/currentUser/actions.ts";
import {useNavigate} from "react-router-dom";
import type {RegisterRequest} from "../models/request/RegisterRequest.ts";

const RegisterForm: FC = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>();

    const navigate = useNavigate();

    const toLoginPageHandler: MouseEventHandler = useCallback(() => {
        navigate('/login')
    }, [navigate])

    const handleRegister = useCallback(async (values: RegisterRequest) => {
            const regResult = await dispatch(registration(values));
            if (regResult) navigate('customers')
        }, []
    );

    return (
        <Form
            form={form}
            name="userForm"
            layout="vertical"
            onFinish={handleRegister}
            style={{width: '300px'}}
        >
            <Form.Item
                label="Фамилия"
                name="secondName"
                rules={[{required: true, message: "Введите фамилию"}]}
            >
                <Input placeholder="Иванов"/>
            </Form.Item>

            <Form.Item
                label="Имя"
                name="name"
                rules={[{required: true, message: "Введите имя"}]}
            >
                <Input placeholder="Иван"/>
            </Form.Item>

            <Form.Item
                label="Отчество"
                name="lastName"
                rules={[{required: true, message: "Введите отчество"}]}
            >
                <Input placeholder="Иванович"/>
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {required: true, message: "Введите email"},
                    {type: "email", message: "Некорректный email"},
                ]}
            >
                <Input placeholder="ivanov@example.com"/>
            </Form.Item>

            <Form.Item
                label="Телефон"
                name="phone"
                rules={[{required: true, message: "Введите номер телефона"}]}
            >
                <Input placeholder="+79991234567"/>
            </Form.Item>

            <Form.Item
                label="Пароль"
                name="password"
                rules={[{required: true, message: "Введите пароль"}]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Зарегистрироваться
                </Button>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="button" onClick={toLoginPageHandler}>
                    Уже зарегистрированы?
                </Button>
            </Form.Item>
        </Form>
    );
};

export default memo(RegisterForm);