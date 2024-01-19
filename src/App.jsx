import React, { useEffect } from "react";
import LoginForm from "./components/Authentication/LoginForm/LoginForm";
import RegistrationForm from "./components/Authentication/RegistrationForm/RegistrationForm";
import { useAuth } from "./components/Authentication/AuthContext";
import "./App.css";

function App() {
  const { token, logOut } = useAuth();

  return (
    <div>
      <h1>User Authentication</h1>
      {!token ? (
        <>
          <LoginForm />
          <RegistrationForm />
        </>
      ) : (
        <button onClick={logOut}>Logout</button>
      )}
    </div>
  );
}

export default App;
