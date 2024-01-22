import React, { createContext, useContext, useState, useMemo } from "react";
import axiosInstance from "../../Api/AxiosDefaults";
import updateProfile from "./ProfileForm/ProfileContext";
import ImageHandler from "../hooks/ImageHandler";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [errors, setErrors] = useState({});

  // functions for user authentication
  const signIn = async (username, password) => {
    try {
      const response = await axiosInstance.post("/users/token/", {
        username,
        password
      });
      setToken(response.data.access);
      setUser(response.data.user);
      setErrors({});
    } catch (error) {
      const errorData = error.response?.data;

      if (errorData && errorData.errors && Array.isArray(errorData.errors)) {
        const detailedError = errorData.errors
          .map((err) => err.detail)
          .join(", ");
        setErrors({ login: detailedError });
      } else {
        setErrors({ login: "Network error or server is not responding." });
      }
    }
  };

  const signUp = async (username, email, password, confirmPassword) => {
    try {
      const response = await axiosInstance.post("/users/register/", {
        username,
        email,
        password,
        confirm_password: confirmPassword
      });
      setToken(response.data.access);
      setErrors({});
      return true;
    } catch (error) {
      console.error("Registration error:", error.response?.data);
      setErrors({
        register:
          error.response?.data.errors ||
          "Network error or server is not responding."
      });
      return false;
    }
  };

  const logOut = () => {
    setToken(null);
    setUser(null);
    setErrors({});
  };

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      token,
      setToken,
      signIn,
      signUp,
      logOut,
      errors,
      setErrors,
      updateProfile,
      ImageHandler
    }),
    [user, token, errors, updateProfile]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
