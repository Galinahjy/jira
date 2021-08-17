import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";
import { Form, Input, Button } from "antd";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/use-async";

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async ({
    cpassword,
    ...value
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== value.password) {
      onError(new Error("请确认两次输入的密码一致"));
      return;
    }

    try {
      await run(register(value));
    } catch (e) {
      onError(e);
    }
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
      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "Please confirm your username!" }]}
      >
        <Input.Password
          type="password"
          id={"cpassword"}
          placeholder={"Please confirm your password!"}
        />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
