/**
 * @description 未登陆状态的app的 login
 * @author Galina
 */

import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";
import { Form, Button, Input } from "antd";
import { LongButton } from "unauthenticated-app";

export const LoginScreen = () => {
  const { login } = useAuth();

  // 没有引用antd之前
  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const username = (event.currentTarget.elements[0] as HTMLInputElement)
  //     .value;
  //   const password = (event.currentTarget.elements[1] as HTMLInputElement)
  //     .value;
  //   login({ username, password });
  // };

  const handleFinish = (value: { username: string; password: string }) => {
    login(value);
  };

  return (
    <Form onFinish={handleFinish}>
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
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          type="password"
          id={"password"}
          placeholder={"Please input your password!"}
        />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType={"submit"} type={"primary"}>
          登陆
        </LongButton>
      </Form.Item>
    </Form>
  );
};
