import React, { useState, useContext } from "react";
import { ProfileContext } from "../Profile/ProfileContext";
import { Button, Form } from "react-bootstrap";

function ChangePassword() {
  const { changePassword } = useContext(ProfileContext);
  const [passwordData, setPasswordData] = useState({
    new_password1: "",
    new_password2: ""
  });

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.new_password1 === passwordData.new_password2) {
      await changePassword({ new_password: passwordData.new_password1 });
    } else {
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>New Password</Form.Label>
        <Form.Control
          type="password"
          name="new_password1"
          value={passwordData.new_password1}
          onChange={handlePasswordChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Confirm New Password</Form.Label>
        <Form.Control
          type="password"
          name="new_password2"
          value={passwordData.new_password2}
          onChange={handlePasswordChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Update Password
      </Button>
    </Form>
  );
}

export default ChangePassword;
