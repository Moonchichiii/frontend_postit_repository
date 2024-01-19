import React, { createContext, useContext, useState } from "react";
import axiosInstance from "../../Api/AxiosDefaults";

const AuthContext = createContext(null);

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const signIn = async (username, password) => {
    try {
      const response = await axiosInstance.post("/token/", {
        username,
        password,
      });
      setToken(response.data.access);
    } catch (error) {
      console.log(error, error.response);
    }
  };

  const signUp = async (username, email, password, confirmPassword) => {
    try {
      const response = await axiosInstance.post("/register/", {
        username,
        email,
        password,
        confirm_password: confirmPassword,
      });
      setToken(response.data.access);
    } catch (error) {
      console.log(error, error.response);
    }
  };

  const logOut = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, signIn, signUp, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
