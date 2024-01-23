import React, { createContext, useContext, useState, useMemo } from "react";
import axiosInstance from "../../Api/AxiosDefaults";


export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [errors, setErrors] = useState({});
  const [Registered, setRegistered] = useState(false);


  // functions for user authentication
  const signIn = async (username, password) => {
    try {
      const response = await axiosInstance.post("/users/token/", { username, password });
      console.log("Login response data:", response.data);
  
      if (response.data.access && response.data.user_id) {
        setUser({ 
          id: response.data.user_id, 
          profile: response.data.profile_id  
        });
        setToken(response.data.access);        
      } else {
        console.error("Login error: Data is incomplete."); 
        setErrors({ login: "Login failed. Please try again." });
      }
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
      
      console.log("Sign Up Response:", response.data)
      if (response.data.user && response.data.user.id) {
        
        setUser(response.data.user);
        console.log("API response:", response.data);
        setToken(response.data.access);
        console.log("seTtoken:", response.data.access);


        setRegistered(true);
        
      } else {
        
        console.error("Registration data is incomplete. No user ID present.");
        setErrors({ register: "Registration failed. Please try again." });
        return false; 
      }
  
      setErrors({});
      return true;
    } catch (error) {
      console.error("Sign Up Error:", error.response?.data || error);
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
      logOut,
      signUp,
      Registered, 
      setRegistered,
      errors,
      setErrors,
    }),
    [user, token, errors]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};       