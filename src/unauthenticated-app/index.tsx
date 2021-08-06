import React, { useState } from "react";
import { LoginScreen } from "screens/login";
import { RegisterScreen } from "./register";

export const UnAuthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div>
      {isRegister ? <RegisterScreen /> : <LoginScreen />}{" "}
      <button onClick={() => setIsRegister(!isRegister)}>
        切换: {isRegister ? "登陆" : "注册"}
      </button>
    </div>
  );
};
