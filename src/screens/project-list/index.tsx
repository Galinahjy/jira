import React, { useState, useEffect } from "react";
import { List, Project } from "./list";
import { SearchPanel } from "./search-panel";
import { cleanObject, useDebounce, useMount } from "utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useAsync } from "utils/use-async";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";

const apiUrl = process.env.REACT_APP_API_URL;

// 使用JS，大部分是在runtime时候发现错误
// 使用TS，在静态代码中，就能找到其中的一些错误 -> 强类型

export const ProjectListScreen = () => {
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });
  const debounceParams = useDebounce(params, 200);
  // const [users, setUsers] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<null | Error>(null);
  // const [list, setList] = useState([]);
  const { isLoading, error, data: list } = useProjects(debounceParams);
  const { data: users } = useUsers();

  // const client = useHttp();

  // useEffect(() => {
  //   run(client("projects", { data: cleanObject(debounceParams) }));
  // setIsLoading(true);
  // client("projects", { data: cleanObject(debounceParams) })
  //   .then(setList)
  //   .catch((err) => {
  //     setList([]);
  //     setError(err);
  //   })
  //   .finally(() => setIsLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [debounceParams]);

  // useMount(() => {
  //   client("users").then(setUsers);
  // });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel params={params} setParams={setParams} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
