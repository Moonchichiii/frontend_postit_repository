import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { Alert, Button } from "react-bootstrap";




const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { signIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError("");

    try {
      await signIn(username, password);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        setErrors({ non_field_errors: ["Login failed! Please check username and password!"] });
      }
    }
  };

  const renderErrorAlerts = (errorArray, variant) => {
    return errorArray?.map((message, idx) => (
      <Alert key={idx} variant={variant} className="mt-2">
        {message}
      </Alert>
    ));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          aria-label="Enter your username"
          required
        />
        {renderErrorAlerts(errors.username, "danger")}
      </div>

      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          aria-label="Enter your password"
          required
        />
        {renderErrorAlerts(errors.password, "danger")}
      </div>

      {renderErrorAlerts(errors.non_field_errors, "danger")}
      <Button variant="primary" type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;