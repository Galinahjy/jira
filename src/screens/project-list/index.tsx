import React, { useState, useEffect } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import * as qs from "qs";
import { cleanObject, useDebounce, useMount } from "utils";

const apiUrl = process.env.REACT_APP_API_URL;

// 使用JS，大部分是在runtime时候发现错误
// 使用TS，在静态代码中，就能找到其中的一些错误 -> 强类型

export const ProjectListScreen = () => {
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });
  const debounceParams = useDebounce(params, 200);
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debounceParams))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debounceParams]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });

  return (
    <div>
      <SearchPanel params={params} setParams={setParams} users={users} />
      <List list={list} users={users} />
    </div>
  );
};
