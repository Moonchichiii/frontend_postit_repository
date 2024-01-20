import React, { createContext, useContext, useState } from "react";
import axiosInstance from "../../Api/AxiosDefaults";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [errors, setErrors] = useState({});  

  // functions for user authentication
  const signIn = async (username, password) => {
    try {
      const response = await axiosInstance.post("/token/", { username, password });
      setToken(response.data.access);
      setErrors({});  
    } catch (error) {
      const errorData = error.response?.data;
      
      if (errorData && errorData.errors && Array.isArray(errorData.errors)) {
        const detailedError = errorData.errors.map(err => err.detail).join(', ');
        setErrors({ login: detailedError });
      } else {
        setErrors({ login: "Network error or server is not responding." });
      }
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
      setErrors({});  
    } catch (error) {
      console.log("Registration error:", error.response?.data);
      setErrors({ register: error.response?.data.errors || "Network error or server is not responding." });
    }
  };
  

  const logOut = () => {
    setToken(null);
    setUser(null);
    setErrors({});  
  };

  const contextValue = { user, setUser, token, setToken, signIn, signUp, logOut, errors, setErrors };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
