import React, { useState } from "react";
import { useAuth } from "../AuthContext";

const RegistrationForm = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { signUp } = useAuth();

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.password !== userData.confirmPassword) {
      console.error("Passwords do not match!");
      return;
    }

    try {
      await signUp(
        userData.username,
        userData.email,
        userData.password,
        userData.confirmPassword
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={userData.username}
        onChange={handleInputChange}
        placeholder="Username"
      />
      <input
        type="email"
        name="email"
        value={userData.email}
        onChange={handleInputChange}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={userData.password}
        onChange={handleInputChange}
        placeholder="Password"
      />
      <input
        type="password"
        name="confirmPassword"
        value={userData.confirmPassword}
        onChange={handleInputChange}
        placeholder="Confirm Password"
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
