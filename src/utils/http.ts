import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";
const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  data?: object;
  token?: string;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  // axios与fetch的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登陆" });
      }

      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

export const useHttp = () => {
  const { user } = useAuth();
  // TS utility type
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token || "" });
};

/**
 * JS中的typeof，是在runtime时运行的
 * return typeof 1 === 'number'
 *
 * TS中的typeof，是在静态环境运行的
 * return (...[endpoint, config]: Parameters<typeof http>)=>
 *
 */

type Person = {
  name: string;
  sex: number;
  age: number;
};

const XiaoMing: Person = { name: "xiao ming", age: 10, sex: 1 };
const XiaoMingPartial: Partial<Person> = { name: "xiao ming" };
const XiaoMingOmit: Omit<Person, "name" | "sex"> = { age: 10 };
// 还有Pick，Exclude...可以继续往下查找

/**
 * @description 类型别名和interface
 *   类型别名和interface在很多情况下可以互换
 * @description 区别
 *    在TS utility type，interface也是没有办法实现的utility type
 */

// 联合类型
let myFavoriteNum: number | string;
myFavoriteNum = "seven";
myFavoriteNum = 7;

// 不能将类型“{}”分配给类型“string | number”。不能将类型“{}”分配给类型“number”。
// myFavoriteNum = {};

let herFavoriteNum: number | string;

// 类型别名
type FavoriteNum = number | string;
let hisFavoriteNum: FavoriteNum = "seven";
hisFavoriteNum = 7;
