import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { Alert, Button } from "react-bootstrap";

const RegistrationForm = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const { signUp } = useAuth();

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (userData.password !== userData.confirmPassword) {
      setErrors({ confirmPassword: ["Passwords do not match!"] });
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
      if (error.response && error.response.data) {
        
        
        const formattedErrors = error.response.data.errors.reduce((acc, currError) => {
          acc[currError.attr] = acc[currError.attr] || [];
          acc[currError.attr].push(currError.detail);
          return acc;
        }, {});
        setErrors(formattedErrors);
      } else {
        
        setErrors({ non_field_errors: ["Registration failed, please try again."] });
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
          value={userData.username}
          onChange={handleInputChange}
          placeholder="Username"
          aria-label="Enter your username"
        />
        {errors.username &&
          errors.username.map((msg, idx) => (
            <Alert key={idx} variant="danger">
              {msg}
            </Alert>
          ))}
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          placeholder="Email"
          aria-label="Enter your email"
        />
        {errors.email &&
          errors.email.map((msg, idx) => (
            <Alert key={idx} variant="danger">
              {msg}
            </Alert>
          ))}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
          placeholder="Password"
          aria-label="Enter desired password"
        />
        {errors.password &&
          errors.password.map((msg, idx) => (
            <Alert key={idx} variant="danger">
              {msg}
            </Alert>
          ))}
      </div>
      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          id="confirmPassword"
          name="confirmPassword"
          value={userData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm Password"
          aria-label="Confirm your password"
        />
        {errors.confirmPassword &&
          errors.confirmPassword.map((msg, idx) => (
            <Alert key={idx} variant="danger">
              {msg}
            </Alert>
          ))}
      </div>
      {errors.handleSubmit &&
        errors.handleSubmit.map((msg, idx) => (
          <Alert key={idx} variant="danger">
            {msg}
          </Alert>
        ))}

      <Button variant="primary" type="submit">
        Register
      </Button>
    </form>
  );
};

export default RegistrationForm;
