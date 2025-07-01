import './App.css';
import 'antd/dist/reset.css';
import React from "react";
import { Form, Input, Button, Select } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

export const NewUserForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      await axios.post("http://localhost:5252/users/create", values);
      form.resetFields();
    } catch (error) {
      console.error("Ошибка");
    }
  };

  return (
      <Form
          form={form}
          name="userForm"
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: 600, margin: "0 auto", paddingTop: 40 }}
      >
        <Form.Item
            label="Фамилия"
            name="secondName"
            rules={[{ required: true, message: "Введите фамилию" }]}
        >
          <Input placeholder="Иванов" />
        </Form.Item>

        <Form.Item
            label="Имя"
            name="name"
            rules={[{ required: true, message: "Введите имя" }]}
        >
          <Input placeholder="Иван" />
        </Form.Item>

        <Form.Item
            label="Отчество"
            name="lastName"
            rules={[{ required: true, message: "Введите отчество" }]}
        >
          <Input placeholder="Иванович" />
        </Form.Item>

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
            label="Телефон"
            name="phone"
            rules={[{ required: true, message: "Введите номер телефона" }]}
        >
          <Input placeholder="+79991234567" />
        </Form.Item>

        <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: "Введите пароль" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
            label="Роль"
            name="role"
            rules={[{ required: true, message: "Выберите роль" }]}
        >
          <Select placeholder="Выберите роль">
            <Option value="admin">Администратор</Option>
            <Option value="user">Пользователь</Option>
            <Option value="supplier">Поставщик</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<UserAddOutlined />}>
            Добавить пользователя
          </Button>
        </Form.Item>
      </Form>
  );
};


function App() {

  return (
    <>
      <NewUserForm/>
    </>
  )
}

export default React.memo(App)
