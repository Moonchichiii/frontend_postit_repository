import React, { createContext, useContext, useState, useMemo } from "react";
import axiosInstance from "../../Api/AxiosDefaults";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [errors, setErrors] = useState({});

  const signIn = async (username, password) => {
    try {
      const response = await axiosInstance.post("/users/login/", {
        username,
        password
      });

      if (response.data.access && response.data.user_id) {
        setUser({
          id: response.data.user_id,
          profile: response.data.profile_id
        });
                
        console.log(setUser);

        setToken(response.data.access);
                setErrors({});
      } else {
        setErrors({ login: ["Login failed. Please try again."] });
      }
    } catch (error) {
      setErrors({
        login: error.response?.data?.errors?.map((err) => err.detail) || [
          "Network error or server is not responding."
        ]
      });
    }
  };

  const signUp = async (username, email, password) => {
    try {
      const response = await axiosInstance.post("/users/register/", {
        username,
        email,
        password
      });
      if (response.data && response.data.access) {
        setToken(response.data.access);
        setUser({
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          profile_id: response.data.profile_id
        });

        console.log(setUser);
        setErrors({});
        return true;
      }
    } catch (error) {
      setErrors({
        register: error.response?.data?.errors || [
          "An unexpected error occurred."
        ]
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
      logOut,
      signUp,
      errors,
      setErrors
    }),
    [user, token, errors]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
