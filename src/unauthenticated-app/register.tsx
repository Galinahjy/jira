import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";
import { Form, Input, Button } from "antd";
import { LongButton } from "unauthenticated-app";

export const RegisterScreen = () => {
  const { register } = useAuth();

  const handleSubmit = (value: { username: string; password: string }) => {
    register(value);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input
          type="text"
          id={"username"}
          placeholder={"Please input your username!"}
        />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input.Password
          type="password"
          id={"password"}
          placeholder={"Please input your password!"}
        />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType={"submit"} type={"primary"}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
