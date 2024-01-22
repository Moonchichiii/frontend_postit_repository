import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Alert, Button } from 'react-bootstrap';

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { signIn, errors, token } = useAuth(); 
  const navigate = useNavigate();
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  // redirects to dashboard if token is present. 
  useEffect(() => {
    if (token) {
        navigate('/dashboard');
    }
}, [token, navigate]);

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
     await signIn(formData.username, formData.password);
     navigate('/dashboard');    
    };
  

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        type="text"
        className="form-control"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        required
        autoComplete="username"
      />
      
      <input
        name="password"
        type="password"
        className="form-control"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
        autoComplete="current-password"
      />
      {errors.login && (
        <Alert variant="danger">{errors.login}</Alert>
      )}       
      
      <Button type="submit" variant="primary">Login</Button>
    </form>
  );
};

export default LoginForm;
