import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { Alert, Button } from "react-bootstrap";

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { signIn, errors } = useAuth();
  

  const handleChange = (e) => {
    const { name, value } = e.target;    
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting login form with data:", formData);
    await signIn(formData.username, formData.password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        type="text"
        className="form-control mb-2"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        required
        autoComplete="username"
      />

      <input
        name="password"
        type="password"
        className="form-control mb-2"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
        autoComplete="current-password"
      />
      {errors.login && <Alert variant="danger">{errors.login}</Alert>}

      <Button type="submit" variant="primary">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
