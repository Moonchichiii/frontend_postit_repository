import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

import { useAuth } from "../../Authentication/AuthContext";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({ bio: "", profileImage: "" });
  const { token } = useAuth();

  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/profiles/");
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const updateProfile = async (formData) => {
    try {
      const response = await axios.put(
        "/profiles/update/",
        formData,
        axiosConfig
      );
      setProfile(response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const changePassword = async (passwordData) => {
    try {
      const response = await axios.post(
        "/api/users/change-password/",
        passwordData,
        axiosConfig
      );
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return (
    <ProfileContext.Provider
      value={{ profile, setProfile, updateProfile, changePassword }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
