import { Input, Form, Select } from "antd";
import React, { useState } from "react";

const { Option } = Select;
export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  params: { name: string; personId: string };
  setParams: (params: SearchPanelProps["params"]) => void;
  users: User[];
}

export const SearchPanel = ({ params, setParams, users }: SearchPanelProps) => {
  // setParams(Object.assign({}, params, { name: EventTarget.target.value }));
  return (
    <Form>
      <div>
        <Input
          type="text"
          value={params.name}
          onChange={(evt) =>
            setParams({
              ...params,
              name: evt.target.value,
            })
          }
        />
        <Select
          value={params.personId}
          onChange={(value) =>
            setParams({
              ...params,
              personId: value,
            })
          }
        >
          <Option value="">负责人</Option>
          {users.map((user) => (
            <Option key={user.id} value={user.id}>
              {user.name}
            </Option>
          ))}
        </Select>
      </div>
    </Form>
  );
};
