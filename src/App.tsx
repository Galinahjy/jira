import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { TsReactTest } from "screens/ts-study/try-use-array";
import { useAuth } from "context/auth-context";
import { AuthenticatedApp } from "authenticated-app";
import { UnAuthenticatedApp } from "unauthenticated-app";

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
      {/* <LoginScreen />
      <ProjectListScreen />
      <TsReactTest/> */}
    </div>
  );
}

export default App;
