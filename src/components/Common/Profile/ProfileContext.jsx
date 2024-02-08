import React, { createContext, useState, useEffect } from "react";
import { useAuth } from "../../Authentication/AuthContext";

import { axiosFormInstance } from "../../../Api/AxiosDefaults";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { token, user } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token || !user?.id) return;

      const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };
      
      try {
        const response = await axiosFormInstance.get(
          `/api/profiles/${user.id}/`,
          axiosConfig
        );
        console.log("Profile data:", response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, [token, user?.id]);

  const updateImg = async (formData) => {
    const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };
    try {
      const response = await axiosFormInstance.put(
        `/api/profiles/${user.id}/`,
        formData,
        axiosConfig
      );
      console.log("Profile update response:", response.data);
    } catch (error) {
      console.error("Error updating profile image:", error);
    }
  };

  const changePass = async (passData) => {
    const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };
    try {
      const response = await axiosFormInstance.post(
        "/users/change-password/",
        passData,
        axiosConfig
      );
      console.log("Password change response:", response.data);
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return (
    <ProfileContext.Provider value={{ updateImg, changePass }}>
      {children}
    </ProfileContext.Provider>
  );
};
